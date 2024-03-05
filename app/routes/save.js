const { GET } = require('../constants/http-verbs')
const Joi = require('joi')

module.exports = {
  method: GET,
  path: '/save',
  options: {
    auth: false,
    validate: {
      query: {
        settings: Joi.alternatives().try(Joi.string(), Joi.array()).default([])
      }
    }
  },
  handler: (request, h) => {
    const { settings } = request.query
    const query = typeof settings === 'string' ? [settings] : settings
    return h.view('index', {
      read: query.includes('read'),
      write: query.includes('write'),
      access: query.includes('access')
    }
    )
  }
}
