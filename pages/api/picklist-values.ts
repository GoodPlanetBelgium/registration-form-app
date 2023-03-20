import { NextApiRequest, NextApiResponse } from 'next'
import { PickListValues } from '../../lib/interfaces'
import salesforceAPI from '../../lib/salesforceAPI'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: PickListValues; error?: string }>
) {
  console.log(req.query)
  const { sObject, field } = req.query
  if (typeof sObject !== 'string' || typeof field !== 'string') {
    console.error('error')
    res
      .status(400)
      .send({ error: 'Please provide correct values for sObject and field.' })
    return
  }
  const endpoint = `services/data/v56.0/ui-api/object-info/${sObject}/picklist-values/0120Y000000yjaEQAQ/${field}`
  const data: PickListValues = await salesforceAPI('GET', endpoint)
  res.status(200).json({ data })
}
