const Joi = require("joi");

const transferSchema = Joi.object({
  senderId: Joi.number().integer().min(1).required().messages({
    "number.base": "O senderId deve ser um número.",
    "number.integer": "O senderId deve ser um número inteiro.",
    "number.min":
      "O senderId deve ser um número positivo (maior ou igual a 1).",
    "any.required": "O senderId é obrigatório.",
  }),
  receiverId: Joi.number().integer().min(1).required().messages({
    "number.base": "O receiverID deve ser um número.",
    "number.integer": "O receiverID deve ser um número inteiro.",
    "number.min":
      "O receiverID deve ser um número positivo (maior ou igual a 1).",
    "any.required": "O receiverID é obrigatório.",
  }),
  amount: Joi.number()
    .precision(2)
    .positive()
    .min(0.01)
    // .max(10000.0)
    .required()
    .messages({
      "number.base": "O valor da transferência deve ser um número.",
      "number.precision": "O valor deve ter no máximo duas casas decimais.",
      "number.positive":
        "O valor da transferência deve ser um número positivo.",
      "number.min": "O valor mínimo para transferência é de R$ 0,01.",
      // "number.max":
      // "O valor máximo permitido por transferência é de R$ 10.000,00.",
      "any.required": "O campo de valor da transferência é obrigatório.",
    }),
});

module.exports = transferSchema;
