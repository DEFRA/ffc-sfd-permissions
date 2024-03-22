const { mapAuth } = require('ffc-auth')
const { getJourneyConfig } = require('../utils')

module.exports = {
  plugin: {
    name: 'view-context',
    register: (server, _options) => {
      server.ext('onPreResponse', (request, h) => {
        const { response: { variety, statusCode, source } } = request
        if (variety === 'view' && statusCode !== 404 && statusCode !== 500 && source.manager._context) {
          source.manager._context.auth = mapAuth(request)
          source.manager._context.pageTitle = getJourneyConfig(request.path)?.title
        }

        return h.continue
      })
    }
  }
}
