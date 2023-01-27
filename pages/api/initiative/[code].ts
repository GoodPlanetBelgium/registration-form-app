import { NextApiRequest, NextApiResponse } from 'next'
import { School } from '../../../lib/interfaces'
import salesforceAPI from '../../../lib/salesforceAPI'

type Data = {
  records: School[]
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code } = req.query
  const endpoint = `/services/data/v56.0/sobjects/CO_Initiative__c/C_Code__c/${code}`
  const data = await salesforceAPI('GET', endpoint)
  res.status(200).json(data)
}
