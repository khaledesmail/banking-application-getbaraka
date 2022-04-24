const bcrypt = require("bcryptjs");
const Service = require("./service");
const TokenService = require("./tokenService");
const { logger } = require("../utilities");
const responseCodes = require("../config/responseCodes");
const accountModel = require("../model/account");

class AccountService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async signin(body) {
    let response = {};
    try {
      logger.info("_____________SIGNIN METHOD SERVICE____________");
      const userName = body.userName;
      let query = {
        userName,
      };
      let hasProfile = await super.findOne(query);
      logger.info("hasProfile", hasProfile);
      if (!hasProfile.body.data) return responseCodes["11"];
      let isMatch = await this._compareAsync(
        body.password,
        hasProfile.body.data.password
      );
      logger.info("isMatch", isMatch);
      if (!isMatch) return responseCodes["01"];
      const profileInfo = hasProfile.body.data;
      let generateToken = await TokenService.generateToken(
        profileInfo
      );
      response = responseCodes["02"];
      response.body.data = generateToken;
      return response;
    } catch (error) {
      logger.info("error", error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async signup(payload) {
    let response = {};
    payload.email = payload.email.trim().toLowerCase();
    let query = {
      email: payload.email,
    };
    let isExists = await super.findOne(query);
    if (isExists.body.data) {
      // is null
      response = responseCodes["10"];
      return response;
    }
    const item = await super.insert(payload);
    // Deleteing password form response
    item.body.data = {
      _id: item.body.data._id,
      firstName: item.body.data.firstName,
      lastName: item.body.data.lastName,
      email: item.body.data.email,
    };
    return item;
  }
  _compareAsync(commingPassword, realPassword) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(commingPassword, realPassword, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
module.exports = new AccountService(accountModel);
