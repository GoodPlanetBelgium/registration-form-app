interface FormContact {
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  newsLetter?: boolean
}

interface FormRegistration {
  groupName: string
  groupSize: number
  copyApplicant: boolean
  groupContact: Contact
  dayOfWeekPreference: string[]
  monthPreference: string
}

interface FormAccount {
  id: string
  educationType: string[]
  schedule: string | null
}

interface Form {
  account: FormAccount
  applicant: FormContact
  remark?: string
  agreed: boolean
}

interface FormValues extends Form {
  workshops: {
    [workshopId: string]: Registration[]
  }
}

type TransformedRegistration = Omit<FormRegistration, 'monthPreference'> & {
  workshopId: string
  monthPreference: string[]
}

interface FormResult extends Form {
  initiativeId: string
  registrations: TransformedRegistration[]
}
