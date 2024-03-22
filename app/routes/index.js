const { getPreference } = require('../backend/api')
const { GET } = require('../constants/http-verbs')

module.exports = {
  method: GET,
  path: '/',
  options: {
    auth: false,
    handler: async (_request, h) => {
      const sbi = '1'
      const preference = await getPreference(sbi)
      return h.view('index', preference)
    }
  }
}
