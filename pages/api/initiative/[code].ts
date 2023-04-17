import { NextApiRequest, NextApiResponse } from 'next'
import salesforceAPI from '../../../lib/salesforceAPI'

type Data = {
  error?: string
  data?: SFInitiative
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
  const url = `/services/apexrest/Initiative/${code.toUpperCase()}`
  const data = await salesforceAPI({ method: 'GET', url })
  res.status(200).json({ data })
}
