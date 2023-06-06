import { NextApiRequest, NextApiResponse } from 'next'
import createListItem from '../../lib/sharePoint'

type SignUpResponse = {
  error?: string
  result?: {
    message: string
  }
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>
) {
  if (req.method === 'POST') {
    try {
      console.log('Creating list item...')
      const data = await createListItem(req.body)
      console.log(JSON.stringify(data, null, 2))
      res.status(200).json(data)
    } catch (error) {
      console.error('ERROR IN: /api/sptest')
      console.error(error)
      res.status(500).json({ result: { message: 'Internal server error.' } })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export type { SignUpResponse }
