import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormHelperText,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import { FieldArray, getIn } from 'formik'
import { FieldProps } from 'formik'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import useTranslations from '../../lib/useTranslations'
import RegistrationSubForm from '../form/RegistrationSubForm'
import { registrationInitialValues } from '../form/schema'
import getText from '../../lib/getText'

interface Props {
  initiative: SFInitiative
  workshopId: string
}

const WorkshopField: FC<Props & FieldProps> = ({
  field,
  initiative,
  workshopId,
  form: { touched, errors }
}) => {
  const {
    name,
    value: { registrations }
  }: { name: string; value: FormWorkshop } = field

  const error = (getIn(touched, name) && getIn(errors, name)) || ''
  const workshop = initiative.Workshops__r.records.find(
    w => w.Id === workshopId
  ) as SFWorkshop
  const t = useTranslations('Form')
  const { locale } = useRouter()
  const [activeTab, setActiveTab] = useState<number | false>(false)

  const addRegistration = (push: (obj: any) => void) => () => {
    push(registrationInitialValues)
    setActiveTab(registrations.length)
  }

  const removeRegistration = (remove: (i: number) => void, i: number) => () => {
    setActiveTab(
      !registrations.length || registrations.length === 1
        ? false
        : i === registrations.length - 1
        ? i - 1
        : i
    )
    remove(i)
  }

  const info = getText(locale, 'Info', workshop)

  return (
    <>
      <Accordion
        disableGutters
        defaultExpanded
        sx={{ borderRadius: 1, p: '1rem', m: '2rem 0' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h2'>
            {getText(locale, 'Title', workshop)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!!info && (
            <Alert
              severity='info'
              icon={false}
              variant='standard'
              sx={{ m: 0 }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: info
                }}
              />
            </Alert>
          )}
          <h3>{t('sub.workshop.registrationsTitle')}</h3>
          <FieldArray name={`${field.name}.registrations`}>
            {({ push, remove }) => (
              <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={activeTab}
                    onChange={(e, newTab: number) => setActiveTab(newTab)}
                    scrollButtons='auto'
                  >
                    {registrations.map((registration, i) => (
                      <Tab
                        key={i}
                        label={registration.groupName || `#${i + 1}`}
                      />
                    ))}
                  </Tabs>
                </Box>
                {registrations.map((registration, i) => (
                  <Box
                    key={i}
                    sx={{ display: activeTab !== i ? 'none' : 'block', mt: 2 }}
                  >
                    <RegistrationSubForm
                      nameSpace={`${name}.registrations[${i}]`}
                      workshop={workshop}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          onClick={removeRegistration(remove, i)}
                          variant='outlined'
                          color='warning'
                          title={t('sub.workshop.remove')}
                          size='large'
                          fullWidth
                        >
                          <DeleteIcon sx={{ mr: 1 }} />
                          <span>{t('sub.workshop.remove')}</span>
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={8}>
                        <Button
                          onClick={addRegistration(push)}
                          variant='contained'
                          color='success'
                          size='large'
                          disabled={
                            registrations.length ===
                            workshop.C_Max_Registrations_Per_School__c
                          }
                          fullWidth
                        >
                          <span>{t('sub.workshop.addAnother')}</span>
                        </Button>
                        {registrations.length ===
                          workshop.C_Max_Registrations_Per_School__c && (
                          <FormHelperText>
                            {t('sub.workshop.field.maxRegistrations', {
                              max: workshop.C_Max_Registrations_Per_School__c
                            })}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                {!registrations.length && (
                  <Button
                    onClick={addRegistration(push)}
                    variant='contained'
                    color='success'
                    size='large'
                    sx={{ m: 2 }}
                  >
                    <span>{t('sub.workshop.add')}</span>
                  </Button>
                )}
              </Box>
            )}
          </FieldArray>
          {Boolean(error) && (
            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
              {typeof error === 'string' ? error : null}
            </FormHelperText>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default WorkshopField
