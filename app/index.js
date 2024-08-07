require('./insights').setup()
require('log-timestamp')

const { createServer } = require('./server')

createServer()
  .then(server => server.start())
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
