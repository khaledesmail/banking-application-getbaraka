const responseCodes = require("../../config/responseCodes");
const mongoose = require("mongoose");
const { logger } = require("../../utilities");
const BalanceService = require("../../service/balanceService");
const balanceModel = require("../../model/balance");

class BalanceController {
  constructor(service, model) {
    this.model = model;
    this.service = service;
  }
  async deposit(body, params) {
    let response = {};
    try {
      logger.info("_____________DEPOSIT METHOD CONTROLLER____________");
      const _id = new mongoose.Types.ObjectId(params.accountId);
      body.accountId = _id;
      response = await this.service.deposit(body);
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async withdraw(body, params) {
    let response = {};
    try {
      logger.info("_____________withdrawMETHOD CONTROLLER____________");
      const _id = new mongoose.Types.ObjectId(params.accountId);
      body.accountId = _id;
      response = await this.service.withdraw(body);
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async findOne(params) {
    let response = {};
    try {
      logger.info("_____________FIND METHOD CONTROLLER____________");
      const accountId = params.accountId
        ? new mongoose.Types.ObjectId(params.accountId)
        : null;
      const query = accountId ? { accountId } : {};
      response = await this.service.findOne(query);
      response.body.data = {
        accountId: response.body.data.accountId,
        balance: response.body.data.balance,
      };
      return response;
    } catch (error) {
      logger.info("error", error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async transfer(body, params) {
    let response = {};
    try {
      logger.info("_____________transfer METHOD CONTROLLER____________");
      const _id = new mongoose.Types.ObjectId(params.accountId);
      body.accountId = _id;
      response = await this.service.transfer(body);
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async internationalTransfer(body, params) {
    let response = {};
    try {
      logger.info("_____________international transfer METHOD CONTROLLER____________");
      const _id = new mongoose.Types.ObjectId(params.accountId);
      body.accountId = _id;
      response = await this.service.internationalTransfer(body);
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
}
module.exports = new BalanceController(BalanceService, balanceModel);
