import { NextApiRequest, NextApiResponse } from 'next'
import { Account } from '../../lib/interfaces'
import salesforceAPI from '../../lib/salesforceAPI'

type Data = {
  records: Account[]
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const recordTypeId = '0120Y000000yjaEQAQ'
  const endpoint = `/services/data/v56.0/query/?q=SELECT+Id,name,ShippingStreet,ShippingCity,ShippingPostalCode,GP_Account_Type__c+from+Account+WHERE+RecordTypeId='${recordTypeId}'+AND+ShippingPostalCode='${req.query.postcode}'`
  const data = await salesforceAPI('GET', endpoint)
  res.status(200).json(data)
}
