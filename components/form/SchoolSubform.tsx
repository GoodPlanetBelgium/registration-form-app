import { Field } from 'formik'
import { Account, Initiative } from '../../lib/interfaces'
import TypeOfEducationField from '../fields/TypeOfEducationField'
import ScheduleField from '../fields/ScheduleField'
import useTranslations from '../../lib/useTranslations'
import Section from '../Section'

interface Props {
  nameSpace: string
  initiative: Initiative
  account: Account
}

const SchoolSubform = ({ nameSpace, initiative, account }: Props) => {
  const t = useTranslations('Form')
  return (
    <>
      <Field
        name={`${nameSpace}.educationType`}
        label={t('field.educationType')}
        account={account}
        component={TypeOfEducationField}
      />
      {initiative.C_Registrations_Ask_for_school_hours__c && (
        <Field
          name={`${nameSpace}.schedule`}
          label={t('field.schedule')}
          component={ScheduleField}
        />
      )}
    </>
  )
}

export default SchoolSubform
