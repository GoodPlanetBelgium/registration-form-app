import { Field, getIn, useFormikContext } from 'formik'
import useTranslations, {
  useTranslationsCategory
} from '../../lib/useTranslations'
import CheckboxField from '../fields/CheckboxField'
import SelectField from '../fields/SelectField'
import TextField from '../fields/TextField'
import Section from '../Section'
import ContactSubForm from './ContactSubForm'
import { Box, Grid } from '@mui/material'
import FieldSwitch from '../fields/FieldSwitch'

interface Props {
  nameSpace: string
  workshop: SFWorkshop
  questions: SFQuestion[]
}

const RegistrationSubForm = ({ nameSpace, workshop, questions }: Props) => {
  const t = useTranslations('Form')
  const days = useTranslationsCategory('Days')
  const months = useTranslationsCategory('Months')
  const { values } = useFormikContext()

  return (
    <>
      <Section label={t('sub.workshop.groupTitle')}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} sx={{ width: '100%' }}>
            <Field
              name={`${nameSpace}.groupName`}
              label={t('sub.workshop.field.groupName')}
              component={TextField}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ width: '100%' }}>
            <Field
              name={`${nameSpace}.groupSize`}
              label={t('sub.workshop.field.groupSize')}
              component={TextField}
              type='number'
            />
          </Grid>
        </Grid>
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
      {(!!workshop.C_Weekday_Preferences__c ||
        !!workshop.C_Month_Preferences__c) && (
        <Section label={t('sub.workshop.preferencesTitle')}>
          <Grid container spacing={2}>
            {!!workshop.C_Weekday_Preferences__c && (
              <Grid item xs={12} sm={6} md={4} sx={{ width: '100%' }}>
                <Field
                  name={`${nameSpace}.dayOfWeekPreference`}
                  label={t('sub.workshop.field.dayOfWeekPreference')}
                  component={SelectField}
                  options={workshop.C_Weekday_Preferences__c.split(';').map(
                    day => ({
                      value: day,
                      label: days[day]
                    })
                  )}
                  multiple
                />
              </Grid>
            )}
            {!!workshop.C_Month_Preferences__c && (
              <Grid item xs={12} sm={6} md={4} sx={{ width: '100%' }}>
                <Field
                  name={`${nameSpace}.monthPreference`}
                  label={t('sub.workshop.field.monthPreference')}
                  component={SelectField}
                  options={workshop.C_Month_Preferences__c.split(';').map(
                    month => ({
                      value: month,
                      label: months[month]
                    })
                  )}
                  multiple
                />
              </Grid>
            )}
          </Grid>
        </Section>
      )}
      {questions
        .sort((a, b) => a.C_Question_Order__c - b.C_Question_Order__c)
        .map((q, i) => (
          <Box sx={{ my: 2 }} key={i}>
            <FieldSwitch nameSpace={`${nameSpace}.questions`} question={q} />
          </Box>
        ))}
    </>
  )
}

export default RegistrationSubForm
