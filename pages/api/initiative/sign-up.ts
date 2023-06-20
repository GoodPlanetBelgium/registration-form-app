import { NextApiRequest, NextApiResponse } from 'next'
import salesforceAPI from '../../../lib/salesforceAPI'
import sharePoint from '../../../lib/sharePoint'
import pino from 'pino'

const logger = pino()

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      console.log('Signing up...')
      const formResult: ExtendedFormValues = JSON.parse(req.body)

      logger.info({
        event: { type: 'formValues', tag: 'signup' },
        data: formResult
      })

      // Transform data for SF endpoint
      const registrations: (FormRegistration & { workshopId: SFId })[] = []
      Object.keys(formResult.workshops).forEach(workshopId =>
        formResult.workshops[workshopId].registrations.forEach(registration =>
          registrations.push({
            workshopId,
            ...registration
          })
        )
      )
      const { workshops, ...restValues } = formResult
      const data: FormResultForSF = {
        ...restValues,
        registrations
      }

      // Call the SF endpoint and create the registrations
      const url = `/services/apexrest/InitiativeRegistration/`
      const sfResult: SFResult = await salesforceAPI({
        method: 'POST',
        url,
        data
      })

      logger.info({
        event: { type: 'sfResult', tag: 'signup' },
        data: sfResult
      })

      // Create SharePoint list items if applicable
      await Promise.all(
        Object.keys(formResult.workshops).map(async workshopId => {
          const workshop = formResult.workshops[workshopId]
          if (!workshop.spSiteId || !workshop.spListId) {
            console.warn('SharePoint site id or list id not set.')
            return
          }
          const listItems: SPListItem[] = []
          sfResult.registrations
            .filter(registration => registration.workshopId === workshopId)
            .forEach(registration =>
              listItems.push({
                initiativeId: formResult.initiativeId,
                initiativeElementId: workshopId,
                accountId: sfResult.accountId,
                accountInitiativeId: registration.SalesForceId,
                ...formResult.workshops[workshopId].questions
                // TODO: add questions from sfResult at registrations level (linked to accountInitiativeId)
              })
            )
          const spResult = await sharePoint(workshop.spSiteId)
            .list(workshop.spListId)
            .createItems(listItems)
          logger.info({
            event: { type: 'spResult', tag: 'signup' },
            data: spResult?.data
          })
          // console.log(JSON.stringify(spResult?.data, null, 2))
        })
      )

      res.status(200).json(sfResult)
    } catch (error) {
      console.error('ERROR IN: /api/initiative/sign-up')
      console.error(error)
      logger.error({ event: { type: 'error', tag: 'signup' }, data: error })
      res.status(500).json({ result: { message: 'Internal server error.' } })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
