import axios from 'axios'
import cache from './cache'
import qs from 'querystring'

const {
  MICROSOFT_GRAPH_HOST,
  MICROSOFT_TENANT_ID,
  MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET
} = process.env

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
  let url = `/sites/${siteId}`
  return {
    list: (listId: string) => {
      url += `/lists/${listId}`
      return {
        createItems: async (items: SPListItem[]) => {
          url += '/items'
          try {
            const headers = await getHeaders()
            return await axios.post(
              `${MICROSOFT_GRAPH_HOST}/$batch`,
              {
                requests: items.map((item, i) => {
                  const fields: SPListItem = {}
                  Object.keys(item).forEach(fieldKey => {
                    const safeFieldKey = fieldKey.replace('-', '_x002d_')
                    if (Array.isArray(item[fieldKey])) {
                      fields[`${safeFieldKey}@odata.type`] =
                        'Collection(Edm.String)'
                    }
                    fields[safeFieldKey] = item[fieldKey]
                  })
                  return {
                    id: i,
                    method: 'POST',
                    url,
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: { fields }
                  }
                })
              },
              { headers }
            )
          } catch (error: any) {
            console.error(error)
          }
        }
      }
    }
  }
}

export default sharePoint
