import * as Yup from 'yup'
import { TranslationType } from './useTranslations'

interface FieldType {
  name: string
  initialValue: string
  validation: any
  type: 'text' | 'email' | 'account'
  label: string
}

interface FormValues {
  accountId: string
  name: string
  email: string
}

const fields = (t: TranslationType): FieldType[] => [
  {
    name: 'accountId',
    initialValue: '',
    validation: Yup.string()
      .required(t('field.required'))
      .matches(/[a-zA-Z0-9]{18}/, t('field.invalid')),
    type: 'account',
    label: t('field.school')
  },
  {
    name: 'name',
    initialValue: '',
    validation: Yup.string().required(t('field.required')),
    type: 'text',
    label: t('field.name')
  },
  {
    name: 'email',
    initialValue: '',
    validation: Yup.string()
      .email(t('field.invalidEmail'))
      .required(t('field.required')),
    type: 'email',
    label: t('field.email')
  }
]

export default fields
export type { FieldType, FormValues }
