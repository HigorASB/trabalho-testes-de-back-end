const express = require("express");
const transferSchema = require("./transferSchema");
const validateRequest = require("./validationMiddleware");
const createBankService = require("./bankService");
const app = express();

const createApp = (users) => {
  const bankService = createBankService(users);

  app.use(express.json());

  app.post("/transfer", validateRequest(transferSchema), (req, res) => {
    try {
      const { senderId, receiverId, amount } = req.body;

      const result = bankService.transfer(senderId, receiverId, amount);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      // Tratamento de erro genérico
      res.status(500).json({ error: error.message });
    }
  });

  return app;
};

module.exports = createApp;
