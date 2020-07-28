const axios = require('axios');
const logger = require('../../utils/logger');

const GiphyRequestFormatter = require('../../formatters/giphy/request');

const GiphyService = {
  async get(title) {
    let response = '';

    try {
      const request = GiphyRequestFormatter.request(title);
      const { data } = await axios.get(request);

      response = data;
    } catch (error) {
      logger.error(error);
      response = {
        error: true,
        message: error.message,
      };
    }

    return response;
  },
};

module.exports = GiphyService;
