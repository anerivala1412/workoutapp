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
const threshold = 0.75;
const InputImg = 'https://www.spiceupthecurry.com/wp-content/uploads/2020/07/shahi-paneer-recipe-2.jpg'




function nutritionSearch(nutritionInfoPromises) {
    Promise.all(nutritionInfoPromises)
        .then(responses => {
            const nutritionInfo = responses.map(response => ({
                name: response.data.foods[0].description,
                calories: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value,
                fat: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)').value,
                protein: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein').value,
                carbs: response.data.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference').value
            }));
            console.log(nutritionInfo);
            const totalCalories = nutritionInfo.reduce((sum, info) => sum + info.calories, 0);
            const totalFat = nutritionInfo.reduce((sum, info) => sum + info.fat, 0);
            const totalProtein = nutritionInfo.reduce((sum, info) => sum + info.protein, 0);
            const totalCarbs = nutritionInfo.reduce((sum, info) => sum + info.carbs, 0);


            console.log(`Total calories: ${totalCalories}`);
            console.log(`Total fat: ${totalFat}`);
            console.log(`Total protein: ${totalProtein}`);
            console.log(`Total carbs: ${totalCarbs}`);
            return `Total calories: ${totalCalories},Total fat: ${totalFat},Total protein: ${totalProtein}, Total carbs: ${totalCarbs}`
        })
        .catch(error => {
            return res.status(500).send({
                message: error.message
            }) 
        });
}

exports.getImageResult = (req, res) => {
    app.models.predict(Clarifai.FOOD_MODEL, req.body.imageUrl)
        .then(response => {
            const foodNames = response.outputs[0].data.concepts
                .filter(concept => concept.name !== undefined && concept.value >= threshold)
                .map(concept => concept.name);
            console.log(foodNames);
            const nutritionInfoPromises = foodNames.map(foodName => {
                const encodedFoodName = encodeURIComponent(foodName);
                const url = `${process.env.NEUTRITION_BASE_URL}?query=${encodedFoodName}&pageSize=1&api_key=${apiKey}`;
                return axios.get(url);
            });
            const items = nutritionSearch(nutritionInfoPromises);
            return res.status(200).send({
                items
            });
        })
        .catch(err => {
            console.log(err);
        });
}