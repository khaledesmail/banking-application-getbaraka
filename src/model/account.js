const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/default.json");

const salt = config.jwt.SALT;

class Account {
  initSchema() {
    const accountSchema = new Schema(
      {
        firstName: {
          type: "string",
          required: true,
        },
        lastName: {
          type: "string",
          required: true,
        },
        email: {
          type: "string",
          required: true,
          trim: true,
        },
        password: {
          type: "string",
          required: true,
          minlength: 8,
        },
        status: {
          type: "string",
          enum: ["active", "deactivate"],
          default: "active",
        }
      },
      {
        timestamps: true,
      }
    );
    // to signup a account
    accountSchema.pre("save", function (next) {
      var account = this;
      if (account.isModified("password")) {
        bcrypt.genSalt(salt, function (err, salt) {
          if (err) return next(err);

          bcrypt.hash(account.password, salt, function (err, hash) {
            if (err) return next(err);
            account.password = hash;
            next();
          });
        });
      } else {
        next();
      }
    });
    mongoose.model("account", accountSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("account");
  }
}

module.exports = new Account().getInstance();
