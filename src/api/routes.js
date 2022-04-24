const express = require("express");
const AccountController = require("./controller/accountController");
const BalanceController = require("./controller/balanceController");

const router = express.Router();
const { auth } = require("./middlewares/auth");
const {
  headerValidatior,
  moneyValidatior,
  accountWrapper,
} = require("./middlewares/validatior");

// APIs For Account signup and signin
router.post(
  "/rest/api/v1/account/signup",
  headerValidatior,
  async (req, res) => {
    let response = await AccountController.signup(req.body);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

router.post(
  "/rest/api/v1/account/signin",
  headerValidatior,
  async (req, res) => {
    const response = await AccountController.signin(req.body);
    res.status(response.status ? response.status : 500).json(response.body.data);
  }
);

// APIs For Account operations
router.delete(
  "/rest/api/v1/account/:accountId",
  auth,
  headerValidatior,
  accountWrapper,
  async (req, res) => {
    const response = await AccountController.deleteOne(req.params);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

router.get(
  "/rest/api/v1/account",
  auth,
  headerValidatior,
  async (req, res) => {
    const response = await AccountController.find(req.params);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);
router.get(
  "/rest/api/v1/account/balance/:accountId",
  auth,
  headerValidatior,
  async (req, res) => {
    const response = await BalanceController.findOne(req.params);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);
router.post(
  "/rest/api/v1/acount/money/deposit/:accountId",
  auth,
  headerValidatior,
  moneyValidatior,
  accountWrapper,
  async (req, res) => {
    const response = await BalanceController.deposit(
      req.body,
      req.params
    );
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

router.post(
  "/rest/api/v1/acount/money/withdraw/:accountId",
  auth,
  headerValidatior,
  moneyValidatior,
  accountWrapper,
  async (req, res) => {
    const response = await BalanceController.withdraw(
      req.body,
      req.params
    );
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

router.post(
  "/rest/api/v1/acount/money/transfer/:accountId",
  auth,
  headerValidatior,
  moneyValidatior,
  accountWrapper,
  async (req, res) => {
    const response = await BalanceController.transfer(
      req.body,
      req.params
    );
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

router.post(
  "/rest/api/v1/acount/money/international/transfer/:accountId",
  auth,
  headerValidatior,
  accountWrapper,
  async (req, res) => {
    const response = await BalanceController.internationalTransfer(
      req.body,
      req.params
    );
    res.status(response.status ? response.status : 500).json(response.body);
  }
);
module.exports = router;
