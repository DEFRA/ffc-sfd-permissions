describe('/save test', () => {
  process.env.AUTH_HOST = '__AUTH_HOST__'
  const { createServer } = require('../../../../app/server')
  let server = null

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('GET /save route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/permissions/save'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /save route works with multiple settings', async () => {
    const options = {
      method: 'GET',
      url: '/permissions/save?settings=read&settings=write&settings=access'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /save route works with single setting', async () => {
    const options = {
      method: 'GET',
      url: '/permissions/save?settings=read'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    await server.stop()
  })
})
