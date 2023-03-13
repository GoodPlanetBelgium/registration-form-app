import { Field } from 'formik'
import useTranslations from '../../lib/useTranslations'
import TextField from '../fields/TextField'

interface Props {
  nameSpace: string
}

const ContactSubForm = ({ nameSpace }: Props) => {
  const t = useTranslations('Form')
  return (
    <>
      <Field
        name={`${nameSpace}.name`}
        label={t('field.name')}
        component={TextField}
      />
      <Field
        name={`${nameSpace}.email`}
        label={t('field.email')}
        type='email'
        component={TextField}
      />
    </>
  )
}

export default ContactSubForm
