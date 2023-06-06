import axios from 'axios'
import cache from './cache'
import qs from 'querystring'

const {
  MICROSOFT_GRAPH_HOST,
  MICROSOFT_TENANT_ID,
  MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET
} = process.env

interface Params {
  siteId: string
  listId: string
  fields: {
    [key: string]: string | number | string[]
  }
}

const MICROSOFT_ACCESS_TOKEN = 'MICROSOFT_ACCESS_TOKEN'

const getHeaders: () => Promise<{
  'Content-Type': string
  Authorization: string
}> = async (forceNew = false) => {
  if (forceNew) console.log('FORCING NEW TOKEN')
  let token = forceNew ? null : await cache.get(MICROSOFT_ACCESS_TOKEN)
  if (!token) {
    console.log('Getting credentials')
    const credentials = await axios.post(
      `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
      qs.stringify({
        client_id: MICROSOFT_CLIENT_ID,
        scope: 'https://graph.microsoft.com/.default',
        client_secret: MICROSOFT_CLIENT_SECRET,
        grant_type: 'client_credentials'
      })
    )
    token = credentials.data.access_token
    cache.set(MICROSOFT_ACCESS_TOKEN, token, credentials.data.expires_in - 10)
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

const sharePoint = (siteId: string) => {
  let url = `${MICROSOFT_GRAPH_HOST}/sites/${siteId}`
  return {
    list: (listId: string) => {
      url += `/lists/${listId}`
      return {
        createItem: async (fields: {
          [key: string]: string | number | string[]
        }) => {
          try {
            return await axios.post(
              `${url}/items`,
              { fields },
              {
                headers: await getHeaders()
              }
            )
          } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data, null, 2))
          }
        }
      }
    }
  }
}

// const createListItem: () => Promise<any> = async (
//   params: Params,
//   token: string
// ) => {
//   if (!token) token = await getToken()
//   console.log(
//     'Calling Microsoft Graph API at: ',
//     `${MICROSOFT_GRAPH_HOST}/sites/${params.siteId}/lists/${params.listId}/items`
//   )
//   let result
//   try {
//     return (result = await axios.post(
//       `${MICROSOFT_GRAPH_HOST}/sites/${params.siteId}/lists/${params.listId}/items`,
//       { fields: params.fields },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       }
//     ))
//   } catch (error: any) {
//     if (error.response.status === 401) {
//       console.log('ERROR')
//       return await createListItem(params, true)
//     }
//     throw new Error(JSON.stringify(error.response.data, null, 2))
//   }
// }

export default sharePoint
