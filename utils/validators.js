const Joi = require('joi');

const irregularVerbsVatidator = (req) =>{
    const validatorSchema = Joi.object({
        verb: Joi.string().required()
    });
    return validatorSchema.validate(req);
}

module.exports = {
    irregularVerbsVatidator
}