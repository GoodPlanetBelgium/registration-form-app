import { NextApiRequest, NextApiResponse } from 'next'
import { Initiative } from '../../../lib/interfaces'
import salesforceAPI from '../../../lib/salesforceAPI'

type Data = {
  error?: string
  data?: Initiative
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code } = req.query
  if (typeof code !== 'string') {
    res.status(400).send({ error: 'Please provide valid code value.' })
    return
  }
  console.log('Calling API: initiative/', code)
  if (typeof code !== 'string') {
    res.status(400).json({ error: 'code should be a string' })
    return
  }
  const endpoint = `/services/apexrest/Initiative/${code.toUpperCase()}`
  const data = await salesforceAPI('GET', endpoint)
  res.status(200).json({ data })
}
