const { GET } = require('../constants/http-verbs')
const Joi = require('joi')

module.exports = {
  method: GET,
  path: '/save',
  options: {
    auth: false,
    validate: {
      query: {
        preference: Joi.string().valid('sms', 'email', 'letter')
      }
    }
  },
  handler: (request, h) => {
    const { preference } = request.query
    return h.view('index', {
      preference
    })
  }
}
