import { NextApiRequest, NextApiResponse } from 'next'
import cache from '../../../../lib/cache'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query
  if (typeof code !== 'string') {
    res.status(400).send({ error: 'Please provide valid code value.' })
    return
  }
  console.log('Refreshing cache:', code)
  await cache.delete(`/services/apexrest/Initiative/${code.toUpperCase()}`)
  res.status(200).json({ message: `Cache deleted, code: ${code}` })
}
