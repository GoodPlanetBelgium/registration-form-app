import { Field, getIn, useFormikContext } from 'formik'
import useTranslations, {
  useTranslationsCategory
} from '../../lib/useTranslations'
import CheckboxField from '../fields/CheckboxField'
import SelectField from '../fields/SelectField'
import TextField from '../fields/TextField'
import ContactSubForm from './ContactSubForm'

interface Props {
  nameSpace: string
}

const RegistrationSubForm = ({ nameSpace }: Props) => {
  const t = useTranslations('Form')
  const days = useTranslationsCategory('Days')
  const months = useTranslationsCategory('Months')
  const { values } = useFormikContext()
  return (
    <>
      <Field
        name={`${nameSpace}.groupName`}
        label={t('sub.workshop.field.groupName')}
        component={TextField}
      />
      <Field
        name={`${nameSpace}.groupSize`}
        label={t('sub.workshop.field.groupSize')}
        component={TextField}
        type='number'
      />
      <Field
        name={`${nameSpace}.copyApplicant`}
        label={t('sub.workshop.field.copyApplicant')}
        onChange={console.log}
        component={CheckboxField}
      />
      {!Boolean(getIn(values, `${nameSpace}.copyApplicant`)) ? (
        <ContactSubForm
          nameSpace={`${nameSpace}.groupContact`}
          fields={['firstName', 'lastName', 'email']}
        />
      ) : null}
      <Field
        name={`${nameSpace}.dayOfWeekPreference`}
        label={t('sub.workshop.field.dayOfWeekPreference')}
        component={SelectField}
        options={Object.keys(days).map(day => ({
          value: day,
          label: days[day]
        }))}
      />
      <Field
        name={`${nameSpace}.monthPreference`}
        label={t('sub.workshop.field.monthPreference')}
        component={SelectField}
        options={Object.keys(months).map(day => ({
          value: day,
          label: months[day]
        }))}
      />
    </>
  )
}

export default RegistrationSubForm
