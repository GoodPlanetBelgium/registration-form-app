import * as Yup from 'yup'
import { Initiative, Workshop } from '../../lib/interfaces'
import { TranslationType } from '../../lib/useTranslations'

interface Contact {
  name: string
  email: string
}

interface Registration {
  groupName: string
  groupContact: Contact
}

interface FormValues {
  accountId: string
  educationType: string[]
  applicant: Contact
  workshops: {
    [workshopId: string]: Registration[]
  }
}

const contactSchema = (t: TranslationType) =>
  Yup.object({
    name: Yup.string().required(t('field.required')),
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
        groupContact: contactSchema(t)
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
    educationType: Yup.array().of(Yup.string()).min(1),
    applicant: contactSchema(t),
    workshops: Yup.object().shape(
      workshopIds.reduce(
        (obj, id) => ({
          ...obj,
          [id]: registrationsSchema(t, id, initiative)
        }),
        {}
      )
    ),
    agreed: Yup.bool().oneOf([true], t('field.required'))
  })
}

const initialValues = (initiative: Initiative) => ({
  accountId: '',
  educationType: [],
  applicant: {
    name: '',
    email: ''
  },
  workshops: initiative.Workshops__r.records.reduce(
    (obj, workshop) => ({
      ...obj,
      [workshop.Id]: []
    }),
    {}
  ),
  agreed: false
})

export { initialValues, validationSchema }
export type { FormValues, Contact, Registration }
