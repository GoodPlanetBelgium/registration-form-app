import { NextApiRequest, NextApiResponse } from 'next'
import salesforceAPI from '../../../lib/salesforceAPI'

type SignUpResponse = {
  error?: string
  result?: {
    message: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>
) {
  if (req.method === 'POST') {
    try {
      console.log('Signing up...')
      console.log(req.body)
      const url = `/services/apexrest/InitiativeRegistration/`
      const data = await salesforceAPI({ method: 'POST', url, data: req.body })
      console.log(JSON.stringify(data, null, 2))
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ result: { message: 'Internal server error.' } })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export type { SignUpResponse }
