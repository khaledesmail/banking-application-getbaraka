const jwt_decode = require("jwt-decode");
const tokenModel = require("../../model/token");
const logger = require("../../utilities/logger");

let auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: true,
      mesaage: "Token is expired, Please try to sign in first",
    });
  }
  let token = req.headers.authorization.split(" ");
  const decodedToken = jwt_decode(token[1]);
  let existToken = await tokenModel.findOne({
    accountId: decodedToken.accountId,
    token: token[1].trim(),
  });
  logger.info({ message: `Token: ${token[1]}` });
  logger.info({ message: existToken });
  if (!existToken) {
    return res.status(401).json({
      error: true,
      mesaage: "Token is expired, Please try to sign in first",
    });
  }
  req.userName = decodedToken.userName;
  next();
};

module.exports = {
  auth,
};
