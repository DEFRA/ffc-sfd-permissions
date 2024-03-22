const index = require('../../../app/routes/index')

describe('/index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await index.options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })
})
