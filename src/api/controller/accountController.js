const responseCodes = require("../../config/responseCodes");
const { logger } = require("../../utilities");
const AccountService = require("../../service/accountService");
const Account = require("../../model/account");
const mongoose = require("mongoose");

class AccountController {
  constructor(service, model) {
    this.model = model;
    this.service = service;
  }
  async signup(body) {
    let response = {};
    try {
      logger.info("_____________SIGNUP METHOD CONTROLLER____________");
      response = await this.service.signup(body);
      return response;
    } catch (error) {
      logger.info("error", error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async signin(body) {
    let response = {};
    try {
      logger.info("_____________SIGNIN METHOD CONTROLLER____________");
      response = await this.service.signin(body);
      return response;
    } catch (error) {
      logger.info("error", error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async deleteOne(params) {
    let response = {};
    try {
      logger.info("_____________DELETE METHOD CONTROLLER____________");
      const _id = new mongoose.Types.ObjectId(params.accountId);
      const query = { _id };
      response = await this.service.deleteOne(query);
      return response;
    } catch (error) {
      logger.info("error", error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async find(params) {
    let response = {};
    try {
      logger.info("_____________FIND METHOD CONTROLLER____________");
      const _id = params.accountId
        ? new mongoose.Types.ObjectId(params.accountId)
        : null;
      const query = _id ? { _id } : {};
      response = await this.service.find(query);
      response.body.data = response.body.data.map((account) => {
        let accountObj = {
          _id: account._id,
          status: account.status,
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
        };
        return accountObj;
      });
      return response;
    } catch (error) {
      logger.info("error", error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
}

module.exports = new AccountController(AccountService, Account);
