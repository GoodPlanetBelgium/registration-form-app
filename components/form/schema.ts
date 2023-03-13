import * as Yup from 'yup'
import { TranslationType } from '../../lib/useTranslations'

interface Contact {
  name: ''
  email: ''
}

interface Registration {
  workshopId: ''
  groupName: ''
  groupContact: Contact
}

interface FormValues {
  accountId: string
  applicant: Contact
  registrations: Registration[]
}

const validationSchema = (t: TranslationType) =>
  Yup.object({
    accountId: Yup.string()
      .required(t('field.required'))
      .matches(/[a-zA-Z0-9]{18}/, t('field.invalid')),
    applicant: Yup.object({
      name: Yup.string().required(t('field.required')),
      email: Yup.string()
        .email(t('field.invalidEmail'))
        .required(t('field.required'))
    })
    // registrations: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       groupName: Yup.string().required(t('field.required'))
    //     })
    //   )
    //   .required(t('field.required'))
  })

const initialValues: FormValues = {
  accountId: '',
  applicant: {
    name: '',
    email: ''
  },
  registrations: []
}

export { initialValues, validationSchema }
export type { FormValues }
