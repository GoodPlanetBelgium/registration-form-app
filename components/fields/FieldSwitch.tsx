import { Alert } from '@mui/material'
import { Field } from 'formik'
import { FC } from 'react'
import getText from '../../lib/getText'
import { useRouter } from 'next/router'
import RadioField from './RadioField'
import TextField from './TextField'

interface FieldSwitchProps {
  nameSpace: string
  question: SFQuestion
}

const FieldSwitch: FC<FieldSwitchProps> = ({ nameSpace, question }) => {
  const { locale } = useRouter()
  const fieldProps = {
    name: `${nameSpace}.${question.Name}`,
    label: getText(locale, 'Title', question)
  }

  switch (question.C_Type__c) {
    case 'text':
    case 'number':
      return (
        <Field
          {...fieldProps}
          type={question.C_Type__c}
          component={TextField}
        />
      )
    case 'choice':
      return (
        <Field
          {...fieldProps}
          component={RadioField}
          options={question.Question_Options__r.records
            .sort((a, b) => a.C_Order__c - b.C_Order__c)
            .map(option => ({
              value: option.Name,
              label: getText(locale, 'Title', option)
            }))}
          multiple={question.C_Multiple__c}
          info={getText(locale, 'Info', question)}
        />
      )
    default:
      return <Alert severity='error'>Error: question type not found.</Alert>
  }
}

export default FieldSwitch
