const { serverConfig } = require('../config/index')

const getJourneyConfig = (path) => serverConfig.journeys[path] || serverConfig.journeys['/']

module.exports = {
  getJourneyConfig
}
