const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../utils/error/bad-request');

module.exports = {
  query: Joi.object({
    i: Joi.array().items(Joi.string()).single().required(),
    q: Joi.string().required(),
    page: Joi.number().optional(),
  }).and('i', 'q')
    .error((errors) => {
      if (errors[0]) {
        console.log(errors[0].code);
        if (errors[0].code === 'object.missing'
        || errors[0].code === 'any.required') {
          throwBadRequest({
            code: 3002,
            message: 'Missing i or q',
            fields: ['i', 'q'],
          });
        } else {
          let fields = [];
          if (errors[0].path) {
            fields = errors[0].path;
          }
          // throw bad request with default message
          throwBadRequest({
            fields,
          });
        }
      }
    }),
};
