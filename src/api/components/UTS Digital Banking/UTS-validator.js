const joi = require('joi');

module.exports = {
  createTransaction: {
    body: {
      sender: joi.string().min(1).max(100).required().label('Sender'),
      receipt: joi.string().min(1).max(100).required().label('Receipt'),
      amount: joi.number().min(1).max(1000000000).required().label('Amount'),
      description: joi.string().min(1).max(100).required().label('Description'),
    },
  },

  updateTransaction: {
    body: {
      sender: joi.string().min(1).max(100).required().label('Sender'),
      receipt: joi.string().min(1).max(100).required().label('Receipt'),
      amount: joi.number().min(1).max(1000000000).required().label('Amount'),
      description: joi.string().min(1).max(100).required().label('Description'),
    },
  },
};