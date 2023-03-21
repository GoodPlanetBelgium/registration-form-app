import * as Yup from 'yup'
import { Initiative, Workshop } from '../../lib/interfaces'
import { TranslationType } from '../../lib/useTranslations'

interface Contact {
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
}

interface Registration {
  groupName: string
  groupSize: number
  copyApplicant: boolean
  groupContact: Contact
  dayOfWeekPreference: string
  monthPreference: string
}

interface FormValues {
  accountId: string
  educationType: string[]
  applicant: Contact
  workshops: {
    [workshopId: string]: Registration[]
  }
}

const contactSchema = (t: TranslationType) => ({
  firstName: Yup.string().required(t('field.required')),
  lastName: Yup.string().required(t('field.required')),
  // role: Yup.string().required(t('field.required')),
  email: Yup.string()
    .email(t('field.invalidEmail'))
    .required(t('field.required'))
})

const registrationsSchema = (
  t: TranslationType,
  id: string,
  initiative: Initiative
) => {
  const workshop = initiative.Workshops__r.records.find(
    w => w.Id === id
  ) as Workshop
  return Yup.array()
    .of(
      Yup.object().shape({
        groupName: Yup.string().required(t('field.required')),
        groupSize: Yup.number().required(t('field.required')),
        copyApplicant: Yup.boolean(),
        groupContact: Yup.object().when('copyApplicant', {
          is: false,
          then: Yup.object(contactSchema(t))
        }),
        dayOfWeekPreference: Yup.string().required(t('field.required')),
        monthPreference: Yup.string().required(t('field.required'))
      })
    )
    .min(
      workshop.C_Required_For_Registration__c ? 1 : 0,
      t('sub.workshop.field.workshopRequired')
    )
}

const validationSchema = (t: TranslationType, initiative: Initiative) => {
  const workshopIds = initiative.Workshops__r.records.map(w => w.Id)
  return Yup.object({
    accountId: Yup.string()
      .required(t('field.required'))
      .matches(/[a-zA-Z0-9]{18}/, t('field.invalid')),
    educationType: Yup.array().of(Yup.string()).min(1, t('field.required')),
    applicant: Yup.object({
      ...contactSchema(t),
      phone: Yup.string().required(t('field.required'))
    }),
    workshops: Yup.object().shape(
      workshopIds.reduce(
        (obj, id) => ({
          ...obj,
          [id]: registrationsSchema(t, id, initiative)
        }),
        {}
      )
    ),
    remark: Yup.string(),
    agreed: Yup.bool().oneOf([true], t('field.required'))
  })
}

const initialValues = (initiative: Initiative) => ({
  accountId: '',
  educationType: [],
  applicant: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: ''
  },
  workshops: initiative.Workshops__r.records.reduce(
    (obj, workshop) => ({
      ...obj,
      [workshop.Id]: []
    }),
    {}
  ),
  remark: '',
  agreed: false
})

const registrationInitialValues = {
  groupName: '',
  groupSize: '',
  copyApplicant: false,
  groupContact: { firstName: '', lastName: '', email: '', role: '' },
  dayOfWeekPreference: '',
  monthPreference: ''
}

export { initialValues, registrationInitialValues, validationSchema }
export type { FormValues, Contact, Registration }
