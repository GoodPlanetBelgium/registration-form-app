interface SFResult {
  registrations: (FormRegistration & {
    workshopId: string
    SalesForceId: string
  })[]
  errors: string[]
  applicant: FormContact & {
    SalesforceId: string
  }
  accountId: string
  account: Omit<FormAccount, 'id'> & { Id: string }
}
