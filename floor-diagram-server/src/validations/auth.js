const Joi = require("joi");

const registerValidator = (data) => {
	const rule = Joi.object({
		name: Joi.string().min(1).max(225).required(),
		username: Joi.string().min(3).max(225).required(),
		// password: Joi.string()
		// 	.pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
		// 	.required(),
	});

	return rule.validate(data);
};
const loginValidator = (data) => {
	const rule = Joi.object({
		username: Joi.string().min(3).max(225).required(),
		password: Joi.string().required(),
	});

	return rule.validate(data);
};

module.exports = { registerValidator, loginValidator };
