var mongoose = require('mongoose');

class Balance {
  constructor(model) {
    this.model = model;
  }
  initSchema() {
    const balanceSchema = mongoose.Schema({
      accountId: {
        type: String,
        required: true,
      },
      balance: {
        type: Number,
        required: true,
      }
    },
    {
      timestamps: true,
    }
    );
    mongoose.model('balance', balanceSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('balance');
  }
}
module.exports = new Balance().getInstance();
