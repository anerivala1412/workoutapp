const Clarifai = require('clarifai');
require('dotenv').config();
const axios = require('axios');


//api id for image processing
const app = new Clarifai.App({
    apiKey: process.env.CLARIFAY_API_KEY
});

//api_id for neutrition website (US department of aggreculture)
const apiKey = process.env.NEUTRITION_API_KEY;

//how sure is the api it detected the meal 
const threshold = 0.9;
const InputImg = 'https://www.spiceupthecurry.com/wp-content/uploads/2020/07/shahi-paneer-recipe-2.jpg'



function nutritionImageSearch(foodName) {
    const encodedFoodName = encodeURIComponent(foodName);
  const url = `${process.env.NEUTRITION_BASE_URL}?query=${encodedFoodName}&pageSize=1&api_key=${apiKey}`;

  return axios.get(url)
    .then(response => {
      const nutritionInfo = {
        name: response.data.foods[0].description,
        servingSize: response.data.foods[0].servingSize,
        calories: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy')?.value,
        fat: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)')?.value,
        protein: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein')?.value,
        carbs: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference')?.value
      };
      console.log(nutritionInfo);
      return nutritionInfo;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

exports.getImageResult = async (req, res) => {
    if(req.body.imageUrl){
        app.models.predict(Clarifai.FOOD_MODEL, req.body.imageUrl)
        .then(response => {
            const foodNames = response.outputs[0].data.concepts
                .filter(concept => concept.name !== undefined && concept.value >= threshold)
                .map(concept => concept.name);
            console.log(foodNames);
            const nutritionInfoPromises = foodNames.map(foodName => {
                return nutritionImageSearch(foodName);
              });
            return Promise.all(nutritionInfoPromises)
            .then(nutritionInfoList => {
                const totalNutrition = {
                    totalCalories: 0,
                    totalFat: 0,
                    totalProtein: 0,
                    totalCarbs: 0
                  };
                  for (let i = 0; i < nutritionInfoList.length; i++) {
                    const nutritionInfo = nutritionInfoList[i];
                    const servingSize = nutritionInfo.servingSize || 10; // default serving size is 100g
                    totalNutrition.totalCalories += (nutritionInfo.calories || 0) * (servingSize / 100);
                    totalNutrition.totalFat += (nutritionInfo.fat || 0) * (servingSize / 100);
                    totalNutrition.totalProtein += (nutritionInfo.protein || 0) * (servingSize / 100);
                    totalNutrition.totalCarbs += (nutritionInfo.carbs || 0) * (servingSize / 100);
                  }
                  console.log(`Total calories: ${totalNutrition.totalCalories}`);
                  console.log(`Total fat: ${totalNutrition.totalFat}`);
                  console.log(`Total protein: ${totalNutrition.totalProtein}`);
                  console.log(`Total carbs: ${totalNutrition.totalCarbs}`);
      
              return { items: totalNutrition, ingredients: foodNames };
            })
            .catch(error => {
              throw new Error(error.message);
            });
        })
        .then(data => {
          return res.status(200).send(data);
        })
        .catch(err => {
          return res.status(500).send({
            message: err.message
          });
        });
    }else{
        if (!req.query.foodName) {
            return res.status(500).send({ errors: 'No Image or Food Name provided' });
        }
        const encodedFoodName = encodeURIComponent(req.query.foodName);
         const url = `${process.env.NEUTRITION_BASE_URL}?query=${encodedFoodName}&pageSize=5&api_key=${apiKey}`;
        const neutritionInfoPromise = await axios.get(url);
        const allfoods = neutritionInfoPromise.data.foods
        const nutritionInfo = allfoods.map(food=>({
            name: food.description,
            ingredients: food.ingredients,
            calories: food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value,
            fat: food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)').value,
            protein: food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein').value,
            carbs: food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference').value
        }))
        return res.send( {queryItems: nutritionInfo })
    }
    
}