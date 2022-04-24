var mongoose = require('mongoose');

class Token {
  constructor(model) {
    this.model = model;
  }
  initSchema() {
    const tokenSchema = mongoose.Schema({
      accountId: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '86400000' },
      },
    },
    {
      timestamps: true,
    }
    );
    mongoose.model('token', tokenSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('token');
  }
}
module.exports = new Token().getInstance();
