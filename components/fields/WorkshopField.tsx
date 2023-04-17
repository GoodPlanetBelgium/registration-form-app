import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import { FieldArray } from 'formik'
import { FieldProps } from 'formik'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import useTranslations from '../../lib/useTranslations'
import RegistrationSubForm from '../form/RegistrationSubForm'
import { registrationInitialValues } from '../form/schema'

interface Props {
  initiative: SFInitiative
  workshopId: string
}

const WorkshopField: FC<Props & FieldProps> = ({
  field,
  initiative,
  workshopId
}) => {
  const registrations = field.value as FormRegistration[]
  const { name } = field
  const workshop = initiative.Workshops__r.records.find(
    w => w.Id === workshopId
  ) as SFWorkshop
  const t = useTranslations('Form')
  const router = useRouter()
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

  return (
    <Accordion
      disableGutters
      defaultExpanded
      sx={{ borderRadius: 1, p: '1rem', m: '2rem 0' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h2'>{workshop?.Name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Alert severity='info' icon={false} variant='standard' sx={{ m: 0 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: workshop[
                `${router.locale?.toUpperCase()}_Info__c` as
                  | 'NL_Info__c'
                  | 'FR_Info__c'
              ].replace('<br>', '')
            }}
          />
        </Alert>
        <h3>{t('sub.workshop.registrationsTitle')}</h3>
        <FieldArray name={field.name}>
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
                    nameSpace={`${name}[${i}]`}
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
                        fullWidth
                      >
                        <AddIcon />
                        <span>{t('sub.workshop.add')}</span>
                      </Button>
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
                  <AddIcon />
                  <span>{t('sub.workshop.add')}</span>
                </Button>
              )}
            </Box>
          )}
        </FieldArray>
      </AccordionDetails>
    </Accordion>
  )
}

export default WorkshopField
