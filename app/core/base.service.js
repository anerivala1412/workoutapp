/**
 * get skip value for pagination
 * @param limit
 * @param page
 */
function getSkipValue(limit, page) {
    return (page - 1) * limit;
}

var validDomainList = ['accenture.com', "boho.com"] // Valid domains...

var emailRegrex = /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/

function validateEmail(email) {
    var requestedEmail = emailRegrex.exec(email)
    if (!requestedEmail) return 'A valid e-mail address is requred';
    var filteredEmail = requestedEmail[1].toLowerCase()
    let validorNot;
    
        if(validDomainList.includes(filteredEmail)){  
            return validorNot = true
        } else {
            return validorNot = false
        }
    
    return validorNot;
}
const storageUrl = process.env.S3_URL
function awsImageUrl(image){
    return `${storageUrl}/${image}`
}
const BaseService = {
    getSkipValue,
    validateEmail,
    awsImageUrl
};
module.exports = BaseService;