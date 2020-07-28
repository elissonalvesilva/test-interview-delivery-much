const AttributesFormatter = require('../attributesFormatter');

const RecipesResponseFormatter = {
  async format({ i }, { results }) {
    const response = {};

    if (i) {
      response.keywords = i[0].includes(',') ? i[0].split(',') : i;
    }

    if (results) {
      response.recipes = await AttributesFormatter.formatResults(results);
    }
    if ('recipes' in response) {
      for (const item of response.recipes) {
        // eslint-disable-next-line no-await-in-loop
        const gif = await AttributesFormatter.populateGif(item);
        item.gif = gif;
      }
    }

    return response;
  },
};

module.exports = RecipesResponseFormatter;
