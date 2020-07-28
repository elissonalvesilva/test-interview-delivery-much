const _ = require('lodash');

const GiphyService = require('../../../services/giphy');

const AttributesFormatter = {
  createIngredients({ ingredients }) {
    return ingredients
      .replace(/\s*,\s*/ig, ',')
      .split(',')
      .sort();
  },

  async populateGif({ title }) {
    const { data } = await GiphyService.get(title);
    if (!_.isEmpty(data[0]) && !(data && 'error' in data)) {
      return data[0].images.original.url;
    }

    return null;
  },

  async formatResults(results) {
    const recipes = [];
    for (const item of results) {
      const recipe = {};
      recipe.title = item.title;
      recipe.link = item.href;
      recipe.ingredients = this.createIngredients(item);
      recipes.push(recipe);
    }

    return recipes;
  },
};

module.exports = AttributesFormatter;
