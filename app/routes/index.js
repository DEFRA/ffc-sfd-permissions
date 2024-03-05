const { GET } = require('../constants/http-verbs')

module.exports = {
  method: GET,
  path: '/',
  options: {
    auth: false,
    handler: (_request, h) => h.view('index', { read: true, write: true, access: true })
  }
}
