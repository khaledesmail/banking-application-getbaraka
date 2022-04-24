const mongoose = require("mongoose");
const responseCodes = require("../config/responseCodes");
const Service = require("./service");
const AccountService = require("./accountService");
const transactionModel = require("../model/transaction");
const balanceModel = require("../model/balance");
const logger = require("../utilities/logger");

class BalanceService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async deposit(payload) {
    logger.info("_____________DEPOSIT METHOD SERVICE____________");
    let response = {};
    try {
      let balance;
      const getBlnace = await super.findOne({ accountId: payload.accountId });
      logger.info("getBlnace", getBlnace);
      if (!getBlnace.body.data) {
        balance = 0;
      } else {
        balance = getBlnace.body.data.balance;
      }
      let credit = Number(payload.money);
      balance += credit;
      await super.updateOne(
        { accountId: payload.accountId },
        { balance },
        { upsert: true }
      );
      const transactionObj = {
        accountId: payload.accountId,
        amount: payload.money,
        type: "deposit",
      };
      logger.info("transactionObj", transactionObj);
      await this._addTransaction(transactionObj);
      response = responseCodes["15"];
      response.body.data = {
        balance,
      };
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      throw response;
    }
  }

  async withdraw(payload) {
    logger.info("_____________WITHDRAW METHOD SERVICE____________");
    let response = {};
    try {
      let balance;
      const getBlnace = await super.findOne({ accountId: payload.accountId });
      if (!getBlnace.body.data) {
        balance = 0;
      } else {
        balance = getBlnace.body.data.balance;
      }
      let debit = Number(payload.money);
      if (debit > balance) {
        response = responseCodes["13"];
        throw response;
      }
      balance -= debit;
      await super.updateOne(
        { accountId: payload.accountId },
        { balance },
        { upsert: true }
      );
      const transactionObj = {
        accountId: payload.accountId,
        amount: payload.money,
        type: "withdraw",
      };
      await this._addTransaction(transactionObj);
      response = responseCodes["16"];
      response.body.data = {
        balance,
      };
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      throw response;
    }
  }

  async transfer(payload) {
    logger.info("_____________transfer METHOD SERVICE____________");
    let response = {};
    try {
      const _id = new mongoose.Types.ObjectId(payload.targetAccountId);
      const query = { _id };
      const isTargetAccountIdValid = await AccountService.findOne(query);
      if (!isTargetAccountIdValid.body.data) {
        response = responseCodes["17"];
        return response;
      }
      let payloadForSourceAccount = {
        accountId: payload.accountId,
        money: payload.money,
      };
      await this.withdraw(payloadForSourceAccount);
      let payloadForTargetAccount = {
        accountId: payload.targetAccountId,
        money: payload.money,
      };
      await this.deposit(payloadForTargetAccount);
      response = responseCodes["18"];
      return response;
    } catch (error) {
      return error;
    }
  }

  /*
   I need an api to integrate with it to enable international transfer
   I checked them but all of them not free I need to paid
   So I mocked the request and the response as a way of simulation
*/
  async internationalTransfer(payload) {
    logger.info(
      "_____________international transfer METHOD SERVICE____________"
    );
    let response = {};
    try {
      const internationalTransferObj = {
        name: payload.targetAccount.name,
        address: payload.targetAccount.address,
        bankName: payload.bankInfo.bankName,
        SWIFT: payload.bankInfo.SWIFT,
        IBAN: payload.bankInfo.IBAN,
        money: payload.money,
      };

      // Block the amount in the account
      // Then call internationalAPI
      await internationalAPI(internationalTransferObj);

      // If response is success
      // withdraw the amount from the account
      const withdrawObj = {
        accountId: payload.accountId,
        money: payload.money,
      };
      this.withdraw(withdrawObj);

      // if the response is failure
      // Unblock the ammount in the account
      // UnblocAmount(accountId);
      // response with the failure

      response = responseCodes["18"];
      return response;
    } catch (error) {
      return error;
    }
  }
  async _addTransaction(transactionObj) {
    await transactionModel.create(transactionObj);
  }
  async internationalAPI(payload) {
    // Check SWIFT validity
    // Check IBAN validity
    // Call API to make the transfare
    // Waiting for response
    // Reply with success or failure
    return true;
  }
}
module.exports = new BalanceService(balanceModel);
