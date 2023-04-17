import axios from 'axios'
import cache from './cache'

const {
  SALESFORCE_API_HOST,
  SALESFORCE_CONSUMER_KEY,
  SALESFORCE_CONSUMER_SECRET
} = process.env

interface Request {
  method: 'GET' | 'POST'
  url: string
  data?: any
}

const call: any = async (request: Request, forceNew = false) => {
  if (forceNew) console.log('FORCING NEW TOKEN')
  let SALESFORCE_ACCESS_TOKEN = forceNew
    ? null
    : await cache.get('SALESFORCE_ACCESS_TOKEN')
  if (forceNew || !SALESFORCE_ACCESS_TOKEN) {
    console.log('Getting credentials')
    const credentials = await axios.post(
      `${SALESFORCE_API_HOST}services/oauth2/token?grant_type=client_credentials&client_id=${SALESFORCE_CONSUMER_KEY}&client_secret=${SALESFORCE_CONSUMER_SECRET}`
    )
    SALESFORCE_ACCESS_TOKEN = credentials.data.access_token
    cache.set('SALESFORCE_ACCESS_TOKEN', SALESFORCE_ACCESS_TOKEN, 86400)
  }

  console.log('Calling SalesForce API: ', request)
  let result
  try {
    result = await axios.request({
      baseURL: SALESFORCE_API_HOST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SALESFORCE_ACCESS_TOKEN}`
      },
      ...request
    })
    return result.data
  } catch (error: any) {
    if (error.response.status === 401) {
      console.log('ERROR')
      return await call(request, true)
    }
    console.error('API ERROR:', error)
  }
}

const salesforceAPI = async (req: Request) => {
  switch (req.method) {
    case 'GET':
      let result = await cache.get(req.url)
      if (!result) {
        result = await call(req)
        await cache.set(req.url, result)
      }
      return result
    case 'POST':
      return await call(req)
    default:
      return new Error('Not found')
  }
}

export default salesforceAPI
