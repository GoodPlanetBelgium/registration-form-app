import { Field, getIn, useFormikContext } from 'formik'
import useTranslations, {
  useTranslationsCategory
} from '../../lib/useTranslations'
import CheckboxField from '../fields/CheckboxField'
import SelectField from '../fields/SelectField'
import TextField from '../fields/TextField'
import Section from '../Section'
import ContactSubForm from './ContactSubForm'

interface Props {
  nameSpace: string
  workshop: SFWorkshop
}

const RegistrationSubForm = ({ nameSpace, workshop }: Props) => {
  const t = useTranslations('Form')
  const days = useTranslationsCategory('Days')
  const months = useTranslationsCategory('Months')
  const { values } = useFormikContext()
  return (
    <>
      <Section label={t('sub.workshop.groupTitle')}>
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
      </Section>
      <Section label={t('sub.workshop.contactTitle')}>
        <Field
          name={`${nameSpace}.copyApplicant`}
          label={t('sub.workshop.field.copyApplicant')}
          component={CheckboxField}
        />
        {!getIn(values, `${nameSpace}.copyApplicant`) && (
          <ContactSubForm
            nameSpace={`${nameSpace}.groupContact`}
            fields={['firstName', 'lastName', 'email', 'role']}
          />
        )}
      </Section>
      <Section label={t('sub.workshop.preferencesTitle')}>
        <Field
          name={`${nameSpace}.dayOfWeekPreference`}
          label={t('sub.workshop.field.dayOfWeekPreference')}
          component={SelectField}
          options={workshop.C_Weekday_Preferences__c.split(';')
            .filter(option => option !== 'No_Preference')
            .map(day => ({
              value: day,
              label: days[day]
            }))}
          multiple
          noPreferenceOption={workshop.C_Weekday_Preferences__c.split(
            ';'
          ).includes('No_Preference')}
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
      </Section>
    </>
  )
}

export default RegistrationSubForm
