function checkRequiredFields(requiredFields) {
    return function(req, res, next) {
      const missingFields = requiredFields.filter(field => !(field in req.body));
      if (missingFields.length > 0) {
        const errorMessage = missingFields.map(field => `Path \`${field}\` is required.`).join(' ');
        return res.status(500).json({ message: errorMessage });
      }
      next();
    }
  }

module.exports = checkRequiredFields;