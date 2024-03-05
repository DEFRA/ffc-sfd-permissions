const indexRoutes = require('../../../app/routes')
const saveRoutes = require('../../../app/routes/save')
const healthyRoutes = require('../../../app/routes/healthy')
const healthzRoutes = require('../../../app/routes/healthz')
const assetsRoutes = require('../../../app/routes/assets')

const router = require('../../../app/plugins/router')

jest.mock('../../../app/routes', () => [{ path: '/' }])
jest.mock('../../../app/routes/save', () => [{ path: '/save' }])
jest.mock('../../../app/routes/healthy', () => [{ path: '/healthy' }])
jest.mock('../../../app/routes/healthz', () => [{ path: '/healthz' }])
jest.mock('../../../app/routes/assets', () => [{ path: '/assets' }])

describe('router plugin', () => {
  test('should register routes when register is called', () => {
    const mockServer = {
      route: jest.fn()
    }

    router.plugin.register(mockServer)

    expect(mockServer.route).toHaveBeenCalledWith(
      [].concat(
        indexRoutes,
        saveRoutes,
        healthyRoutes,
        healthzRoutes,
        assetsRoutes
      )
    )
  })
})
