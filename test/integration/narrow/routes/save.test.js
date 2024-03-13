const cheerio = require('cheerio')

describe('/permissions/save test', () => {
  const { createServer } = require('../../../../app/server')
  let server = null

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('GET /permissions/save route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/permissions/save'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)

    const $ = cheerio.load(response.payload)
    expect($('.govuk-fieldset__heading').text()).toContain('Manage your preference')
  })

  test('GET /permissions/save route works with email as preference', async () => {
    const options = {
      method: 'GET',
      url: '/permissions/save?preference=email'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    const $ = cheerio.load(response.payload)
    expect($('#sms').attr('checked')).toBeFalsy()
    expect($('#email').attr('checked')).toBeTruthy()
    expect($('#letter').attr('checked')).toBeFalsy()
  })

  test('GET /permissions/save route works with letter as preference', async () => {
    const options = {
      method: 'GET',
      url: '/permissions/save?preference=letter'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    const $ = cheerio.load(response.payload)
    expect($('#sms').attr('checked')).toBeFalsy()
    expect($('#email').attr('checked')).toBeFalsy()
    expect($('#letter').attr('checked')).toBeTruthy()
  })

  afterEach(async () => {
    await server.stop()
  })
})
