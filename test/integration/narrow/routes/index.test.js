const cheerio = require('cheerio')

jest.mock('../../../../app/backend/api', () => ({
  getPreference: jest.fn().mockResolvedValue({ preference: 'email' })
}))

describe('/permissions test', () => {
  const { createServer } = require('../../../../app/server')
  let server = null

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('GET /permissions route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/permissions'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)

    const $ = cheerio.load(response.payload)
    expect($('.govuk-fieldset__heading').text()).toContain('Manage your preference')
    expect($('#sms').attr('checked')).toBeFalsy()
    expect($('#email').attr('checked')).toBeTruthy()
    expect($('#letter').attr('checked')).toBeFalsy()
  })

  afterEach(async () => {
    await server.stop()
  })
})
