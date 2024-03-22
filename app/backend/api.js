const wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const post = async (uri, payload) => {
  const url = `http://${serverConfig.dataHost}${uri}`
  try {
    return (await wreck.post(url, { payload })).payload
  } catch (err) {
    console.log(`Encountered error while calling the data service with url: ${url}`, err)
    return null
  }
}

const getPreference = async (sbi) => {
  const response = await post('/', {
    query: `
    { 
      preference(sbi: ${sbi}) {
        sbi,
        preference
      }
    }
  `
  })

  return JSON.parse(response)?.data?.preference || null
}

const savePreference = async (sbi, preference) => {
  const response = await post('/', {
    query: `
      mutation { 
        updatePreference(sbi: "${sbi}", preference: "${preference}") {
          sbi,
          preference
        }
      }
  `
  })
  return JSON.parse(response)?.data?.updatePreference || null
}

module.exports = {
  post,
  getPreference,
  savePreference
}
