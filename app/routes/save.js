const { GET } = require('../constants/http-verbs')
const { savePreference } = require('../backend/api')

const Joi = require('joi')

module.exports = {
  method: GET,
  path: '/save',
  options: {
    auth: false,
    validate: {
      query: {
        preference: Joi.string().valid('sms', 'email', 'letter').required()
      }
    }
  },
  handler: async (request, h) => {
    const sbi = '1'
    const preference = await savePreference(sbi, request.query.preference)
    return h.view('index', preference)
  }
}
