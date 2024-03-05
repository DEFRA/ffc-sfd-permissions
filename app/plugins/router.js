const routes = [].concat(
  require('../routes'),
  require('../routes/save'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/assets')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route(routes)
    }
  }
}
