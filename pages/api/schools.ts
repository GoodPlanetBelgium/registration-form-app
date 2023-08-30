import { NextApiRequest, NextApiResponse } from 'next'
import salesforceAPI from '../../lib/salesforceAPI'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: SFAccount[]; error?: string }>
) {
  const { postcode, region, language, schoolType } = req.query
  if (typeof postcode !== 'string') {
    res.status(400).send({
      error: 'Please provide correct value for postcode.'
    })
    return
  }

  const recordTypeQ = "+RecordTypeId='0120Y000000yjaEQAQ'"

  const postcodeQ =
    postcode.length === 4 ? `+AND+ShippingPostalCode='${postcode}'` : ''

  const schoolTypeQ =
    typeof schoolType === 'string'
      ? `+AND+C_School_Type__c+INCLUDES+('${schoolType
          .split(';')
          .join(`','`)}')`
      : ''

  const regionQ =
    typeof region === 'string'
      ? `+AND+C_Region__c+IN+('${region.split(';').join(`','`)}')`
      : ''

  const languageQ =
    typeof language === 'string' ? `+AND+GP_Language__c=${language}` : ''

  const url =
    '/services/data/v56.0/query/?q=SELECT+Id,name,ShippingStreet,ShippingCity,ShippingPostalCode,C_School_Type__c,GP_Language__c,C_Type_of_Education__c,C_School_Schedule__c+FROM+Account+WHERE' +
    recordTypeQ +
    postcodeQ +
    schoolTypeQ +
    regionQ +
    languageQ

  const data = await salesforceAPI({ method: 'GET', url })
  res.status(200).json({ data })
}
