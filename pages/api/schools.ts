import { NextApiRequest, NextApiResponse } from 'next'
import salesforceAPI from '../../lib/salesforceAPI'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: SFAccount[]; error?: string }>
) {
  const { postcode, schoolType } = req.query
  if (typeof postcode !== 'string') {
    res.status(400).send({
      error: 'Please provide correct value for postcode.'
    })
    return
  }
  const recordTypeQuery = "+RecordTypeId='0120Y000000yjaEQAQ'"
  const postcodeQuery =
    postcode.length === 4 ? `+AND+ShippingPostalCode='${postcode}'` : ''
  const schoolTypeQuery =
    typeof schoolType === 'string'
      ? schoolType.split(';').length === 1
        ? `+AND+C_School_Type__c='${schoolType}'`
        : `+AND+C_School_Type__c+IN+('${schoolType.split(';').join(`','`)}')`
      : ''
  const url =
    '/services/data/v56.0/query/?q=SELECT+Id,name,ShippingStreet,ShippingCity,ShippingPostalCode,C_School_Type__c,GP_Language__c+FROM+Account+WHERE' +
    recordTypeQuery +
    postcodeQuery +
    schoolTypeQuery
  const data = await salesforceAPI({ method: 'GET', url })
  res.status(200).json({ data })
}
