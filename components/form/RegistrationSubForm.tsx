import { Field } from 'formik'
import useTranslations from '../../lib/useTranslations'
import TextField from '../fields/TextField'
import ContactSubForm from './ContactSubForm'

interface Props {
  nameSpace: string
}

const RegistrationSubForm = ({ nameSpace }: Props) => {
  const t = useTranslations('Form')
  return (
    <>
      <Field
        name={`${nameSpace}.groupName`}
        label={'## GROUP NAME'}
        component={TextField}
      />
      <ContactSubForm nameSpace={`${nameSpace}.groupContact`} />
    </>
  )
}

export default RegistrationSubForm
