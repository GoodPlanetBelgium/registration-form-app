interface FormContact {
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  newsLetter?: boolean
}

interface FormQuestion {
  [key: string]: string | number | string[]
}

interface FormRegistration {
  groupName: string
  groupSize: string
  copyApplicant: boolean
  groupContact: Contact
  dayOfWeekPreference: string[]
  monthPreference: string[]
  questions: FormQuestion
}

interface FormAccount {
  id: string
  educationType: string[]
  schedule: string | null
}

interface FormWorkshop {
  questions: FormQuestion
  registrations: FormRegistration[]
  spSiteId?: string
  spListId?: string
}

interface FormValues {
  account: FormAccount
  applicant: FormContact
  remark: string
  agreed: boolean
  workshops: {
    [workshopId: string]: FormWorkshop
  }
}

interface ExtendedFormValues extends FormValues {
  initiativeId: SFId
}

interface FormResultForSF extends Omit<FormValues, 'workshops'> {
  initiativeId: string
  registrations: (FormRegistration & { workshopId: SFId })[]
}
