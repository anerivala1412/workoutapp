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
    for (var i = 0; i < validDomainList.length; i++) {
        if (filteredEmail == validDomainList[i]) {
            return validorNot = true
        } else {
            return validorNot = false
        }
    }

    return validorNot;
}
const BaseService = {
    getSkipValue,
    validateEmail
};
module.exports = BaseService;