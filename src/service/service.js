const responseCodes = require('../config/responseCodes');
const logger = require('../utilities/logger');
const _ = require('lodash');

class Service {
  constructor(model) {
    this.model = model;
  }

  async insert(data) {
    let response = {};
    try {
      logger.info('_____________INSERT METHOD SERVICE____________');
      logger.info('Data', data);
      let item = await this.model.create(data);
      response = responseCodes['06'];
      response.body.data = item;
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }

  async findOne(query) {
    let response;
    try {
      let result = await this.model.findOne(query).exec();
      response = responseCodes['08'];
      response.body.data = result;
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }
  async updateOne(query, payload, options) {
    let response;
    try {
      let result = await this.model.updateOne(query, payload, options);
      response = responseCodes['03'];
      response.body.data = result;
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }
  async find(query) {
    let response = {};
    try {
      logger.info('_____________FIND SERVICE____________');
      const result = await this.model.find(query).exec();
      response = responseCodes['08'];
      response.body.data = result;
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }
  
  async deleteOne(query) {
    let response = {};
    try {
      logger.info('_____________FIND SERVICE____________');
      const result = await this.model.deleteOne(query).exec();
      response = responseCodes['12'];
      response.body.data = result;
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }
}
module.exports = Service;
