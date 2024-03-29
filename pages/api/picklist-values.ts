import { NextApiRequest, NextApiResponse } from 'next'
import salesforceAPI from '../../lib/salesforceAPI'

interface Request extends NextApiRequest {
  query: {
    sObject: 'Account' | 'Contact'
    field: string
  }
}

const { SCHOOL_CONTACT_RECORD_TYPE_ID, SCHOOL_ACCOUNT_RECORD_TYPE_ID } =
  process.env

const recordTypeId = {
  Account: SCHOOL_ACCOUNT_RECORD_TYPE_ID,
  Contact: SCHOOL_CONTACT_RECORD_TYPE_ID
}

export default async function handler (
  req: Request,
  res: NextApiResponse<{ data?: SFPickListValues; error?: string }>
) {
  const { sObject, field } = req.query
  if (typeof sObject !== 'string' || typeof field !== 'string') {
    console.error('error')
    res
      .status(400)
      .send({ error: 'Please provide correct values for sObject and field.' })
    return
  }
  const url = `services/data/v56.0/ui-api/object-info/${sObject}/picklist-values/${recordTypeId[sObject]}/${field}`
  const data: SFPickListValues = await salesforceAPI({ method: 'GET', url })
  res.status(200).json({ data })
}
