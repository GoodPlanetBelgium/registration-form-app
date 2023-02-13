import { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '../../../lib/interfaces'
import salesforceAPI from '../../../lib/salesforceAPI'

type Data = {
  error?: string
  records?: Account[]
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code } = req.query
  console.log('Calling API: initiative/', code)
  if (typeof code !== 'string') {
    res.status(400).json({ error: 'code should be a string' })
    return
  }
  const endpoint = `/services/data/v56.0/sobjects/CO_Initiative__c/C_Code__c/${code.toUpperCase()}`
  const data = await salesforceAPI('GET', endpoint)
  res.status(200).json(data)
}
