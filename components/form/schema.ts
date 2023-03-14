import * as Yup from 'yup'
import { Initiative } from '../../lib/interfaces'
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

const validationSchema = (t: TranslationType, initiative: Initiative) =>
  Yup.object({
    accountId: Yup.string()
      .required(t('field.required'))
      .matches(/[a-zA-Z0-9]{18}/, t('field.invalid')),
    applicant: contactSchema(t),
    workshops: Yup.object().shape(
      initiative.Workshops__r.records.reduce(
        (obj, workshop) => ({
          ...obj,
          [workshop.Id]: Yup.array().of(
            Yup.object().shape({
              groupName: Yup.string().required(t('field.required')),
              groupContact: contactSchema(t)
            })
          )
        }),
        {}
      )
    ),
    agreed: Yup.bool().oneOf([true], t('field.required'))
  })

const initialValues = (initiative: Initiative) => ({
  accountId: '',
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
