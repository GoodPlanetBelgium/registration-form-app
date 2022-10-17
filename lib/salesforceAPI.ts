import axios from 'axios'

const { SALESFORCE_API_HOST, SALESFORCE_ACCESS_TOKEN } = process.env

const axiosInstance = axios.create({
  baseURL: SALESFORCE_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SALESFORCE_ACCESS_TOKEN}`
  }
})

const salesforceAPI = async (
  method: 'GET' | 'POST',
  endpoint: string,
  data?: any
) => {
  console.log('Calling SalesForce API: ', method, endpoint, data)
  const result = await axiosInstance.request({ method, url: endpoint, data })
  return result.data
}

export default salesforceAPI
