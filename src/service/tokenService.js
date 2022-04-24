const tokenModel = require('../model/token');
const { logger } = require('../utilities');
const config = require('../config/default.json');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || config.jwt.SECRET;

class TokenService {
  constructor(model) {
    this.model = model;
  }
  async generateToken(data) {
    logger.info('data', data);
    let accountData = {};
    const now = new Date().getTime() / 1000; // Time now in unix format
    const after24h = (new Date().getTime() + 1500 * 60 * 1000) / 1000; // Time after 24 Hours
    const isTokenExists = await this.model.findOne({ accountId: data._id});
    if (isTokenExists){
      // Etend for another 24 hours
      await this.model.updateOne({ accountId: data._id}, { expiredAt: now});
      return { token: isTokenExists.token };
    }
    const payload = {
      iat: now,
      exp: after24h,
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      userName: data.userName,
      accountId: data._id
    };
    const token = jwt.sign(payload, SECRET);
    accountData.token = token;
    accountData.accountId = data._id;
    accountData.expiredAt = Date.now();
    logger.info('accountData', accountData);
    await this.model.create(accountData);
    return { token };
  }
}

module.exports = new TokenService(tokenModel);
