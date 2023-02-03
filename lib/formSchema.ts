import * as Yup from 'yup'
import { TranslationType } from './useTranslations'

interface fieldType {
  name: string
  initialValue: string
  validation: any
  type: 'text' | 'email'
  label: string
}

const fields = (t: TranslationType): fieldType[] => [
  {
    name: 'accountId',
    initialValue: '',
    validation: Yup.string()
      .required(t('field.required'))
      .matches(/[a-zA-Z0-9]{18}/, t('field.invalid')),
    type: 'text',
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
export type { fieldType }
