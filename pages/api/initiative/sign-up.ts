import { NextApiRequest, NextApiResponse } from 'next'

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
    console.log(req.body)
    res.status(200).json({ result: { message: 'succes!' } })
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export type { SignUpResponse }
