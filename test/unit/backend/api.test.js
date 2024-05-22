const endpoint = '__TEST_ENDPOINT__'
process.env.DATA_HOST = endpoint

const wreck = require('@hapi/wreck')
const { post, getPreference, savePreference } = require('../../../app/backend/api')

describe('Backend API tests', () => {
  const route = '/__TEST_ROUTE__'
  test('service uses the env variable to connect to the backend service', async () => {
    const mockPost = jest.fn()
    jest.spyOn(wreck, 'post').mockImplementation(mockPost)

    await post(route, {})
    expect(mockPost).toHaveBeenCalledWith(`http://${endpoint}${route}`, { payload: {} })
  })

  test('post function handles error and shows a console error log', async () => {
    const mockConsoleLog = jest.fn()
    console.log = mockConsoleLog

    const mockPost = jest.fn().mockRejectedValue(null)
    jest.spyOn(wreck, 'post').mockImplementation(mockPost)

    await post(route, {})

    expect(mockPost).toHaveBeenCalledWith(`http://${endpoint}${route}`, { payload: {} })
    expect(mockConsoleLog).toHaveBeenCalled()
  })

  test('getPreference returns null if no response is received', async () => {
    const mockPost = jest.fn().mockResolvedValue(null)
    jest.spyOn(wreck, 'post').mockImplementation(mockPost)

    const sbi = '1'
    const res = await getPreference(sbi)
    expect(res).toBeNull()

    expect(mockPost).toHaveBeenCalledWith(`http://${endpoint}/`, {
      payload: {
        query: `
    { 
      preference(sbi: ${sbi}) {
        sbi,
        preference
      }
    }
  `
      }
    })
  })

  test('getPreference returns results from the payload', async () => {
    const mockPost = jest.fn().mockResolvedValue({
      payload: JSON.stringify({
        data: {
          preference: {
            sbi: '1',
            preference: 'letter'
          }
        }
      })
    })
    jest.spyOn(wreck, 'post').mockImplementation(mockPost)

    const pref = await getPreference('1')
    expect(pref).toMatchObject({ preference: 'letter', sbi: '1' })
  })

  test('savePreference returns null if no response is received', async () => {
    const mockPost = jest.fn().mockResolvedValue(null)
    jest.spyOn(wreck, 'post').mockImplementation(mockPost)

    const sbi = '1'
    const preference = 'sms'
    const res = await savePreference(sbi, preference)
    expect(res).toBeNull()

    expect(mockPost).toHaveBeenCalledWith(`http://${endpoint}/`, {
      payload: {
        query: `
      mutation { 
        updatePreference(sbi: "${sbi}", preference: "${preference}") {
          sbi,
          preference
        }
      }
  `
      }
    })
  })

  test('savePreference returns results from the payload', async () => {
    const sbi = '1'
    const preference = 'email'
    const mockPost = jest.fn().mockResolvedValue({
      payload: JSON.stringify({
        data: {
          updatePreference: {
            sbi,
            preference
          }
        }
      })
    })
    jest.spyOn(wreck, 'post').mockImplementation(mockPost)

    const pref = await savePreference(sbi, preference)
    expect(pref).toMatchObject({ preference: 'email', sbi: '1' })
  })
})
