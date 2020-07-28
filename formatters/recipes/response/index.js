const _ = require('lodash');

const GiphyService = require('../../../services/giphy');

const createIngredients = ({ ingredients }) => ingredients
  .replace(/\s*,\s*/ig, ',')
  .split(',')
  .sort();

const populateGif = async ({ title }) => {
  const { data } = await GiphyService.get(title);
  if (!_.isEmpty(data[0]) && !(data && 'error' in data)) {
    return data[0].images.original.url;
  }

  return null;
};

const formatResults = async (results) => {
  const recipes = [];
  for (const item of results) {
    const recipe = {};
    recipe.title = item.title;
    recipe.link = item.href;
    recipe.ingredients = createIngredients(item);
    recipes.push(recipe);
  }

  return recipes;
};

const RecipesResponseFormatter = {
  async format({ i }, { results }) {
    const response = {};

    if (i) {
      response.keyword = i;
    }

    if (results) {
      response.recipes = await formatResults(results);
    }

    if ('recipes' in response) {
      for (const item of response.recipes) {
        // eslint-disable-next-line no-await-in-loop
        const gif = await populateGif(item);
        item.gif = gif;
      }
    }

    return response;
  },
};

module.exports = RecipesResponseFormatter;
