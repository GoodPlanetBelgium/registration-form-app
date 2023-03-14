import dayjs, { Dayjs } from 'dayjs'
import { Initiative, Status } from './interfaces'

const getStatus = (
  initiative: Initiative
): { status: Status; earliestOpen: Dayjs } => {
  let status: Status = 'unavailable'
  let earliestOpen = dayjs().add(99, 'years')
  initiative.Workshops__r.records.forEach(workshop => {
    const start = dayjs(workshop.C_Registrations_Start__c)
    if (dayjs().isBefore(start) && dayjs(start).isBefore(earliestOpen)) {
      earliestOpen = start
    }
    switch (workshop.C_Registrations_Status__c) {
      case 'open':
        status = 'open'
        break
      case 'pending':
        if (status !== 'open') {
          status = 'pending'
        }
        break
      case 'closed':
        if (status !== 'open' && status !== 'pending') {
          status = 'closed'
        }
    }
  })
  return { status, earliestOpen }
}

export default getStatus
