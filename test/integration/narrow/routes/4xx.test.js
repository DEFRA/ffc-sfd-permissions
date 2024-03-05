const cheerio = require('cheerio')

describe('4xx error pages', () => {
  process.env.AUTH_HOST = '__AUTH_HOST__'
  const { createServer } = require('../../../../app/server')
  let server = null

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('GET /unknown route returns 404', async () => {
    const options = {
      method: 'GET',
      url: '/unknown'
    }

    const res = await server.inject(options)

    expect(res.statusCode).toBe(404)
    const $ = cheerio.load(res.payload)
    expect($('.govuk-heading-l').text()).toEqual('Page not found')
  })

  afterEach(async () => {
    await server.stop()
  })
})
