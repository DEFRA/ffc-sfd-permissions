const { createServer } = require('../../app/server')

jest.mock('@hapi/hapi', () => {
  return {
    server: jest.fn().mockImplementation(() => {
      return {
        register: jest.fn(),
        validator: jest.fn()
      }
    })
  }
})
const hapi = require('@hapi/hapi')
jest.mock('@hapi/inert')

describe('Server setup', () => {
  test('should setup app insights and start the server', async () => {
    const result = await createServer()
    expect(hapi.server).toHaveBeenCalled()
    expect(result).toBeDefined()
  })
})
