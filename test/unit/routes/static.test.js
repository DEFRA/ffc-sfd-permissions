const assetsRoute = require('../../../app/routes/assets')

describe('Routes tests', () => {
  test('GET assets', async () => {
    expect(assetsRoute).toBeDefined()
  })
})
