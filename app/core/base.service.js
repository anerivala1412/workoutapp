/**
 * get skip value for pagination
 * @param limit
 * @param page
 */
function getSkipValue(limit, page) {
    return (page - 1) * limit;
}
const BaseService = {
    getSkipValue
};
module.exports = BaseService;