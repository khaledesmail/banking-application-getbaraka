const Ajv = require('ajv');
const schema = require('./schema.json');
const responseCodes = require('../../config/responseCodes');
const AccountService = require('../../service/accountService');
const mongoose = require("mongoose");

const ajv = new Ajv({ allErrors: true });

const headerValidatior = (req, res, next) => {
  const valid = ajv.validate(schema.REQUEST_HEADER_SCHEMA, req.headers);
  if (!valid) {
    const response = responseCodes['05'];
    response.body.data = valid.errors;
    return res.status(response.status).json(response.body);
  }
  next();
};

const moneyValidatior = (req, res, next) => {
  const valid = ajv.validate(schema.REQUEST_MONEY_SCHEMA, req.body);
  if (!valid || req.body.money < 0) {
    const response = responseCodes['14'];
    response.body.data = valid.errors;
    return res.status(response.status).json(response.body);
  }
  next();
};
const accountWrapper = async (req, res, next) => {
  try {
  const _id = new mongoose.Types.ObjectId(req.params.accountId);
  const query = { _id };
  const isAccountIdValid = await AccountService.findOne(query);
  if (!isAccountIdValid.body.data) {
    return res.status(404).json({
      message: `Account ${query._id} not found`,
    });
  }
  next();
} catch (error) {
  response = responseCodes["07"];
  return res.status(500).json(error);
}
};

module.exports = {
  headerValidatior,
  moneyValidatior,
  accountWrapper
};
