describe('/healthy test', () => {
  process.env.AUTH_HOST = '__AUTH_HOST__'
  const { createServer } = require('../../../../app/server')
  let server = null

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('GET /healthy route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/permissions/healthy'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    await server.stop()
  })
})
