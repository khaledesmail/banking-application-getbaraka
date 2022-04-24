var mongoose = require('mongoose');

class Transaction {
  constructor(model) {
    this.model = model;
  }
  initSchema() {
    const transactionSchema = mongoose.Schema({
      accountId: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["deposit", "withdraw"],
      }
    },
    {
      timestamps: true,
    }
    );
    mongoose.model('transaction', transactionSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('transaction');
  }
}
module.exports = new Transaction().getInstance();
