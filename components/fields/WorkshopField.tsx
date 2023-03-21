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
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import { FieldArray } from 'formik'
import { FieldProps } from 'formik'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Initiative, Workshop } from '../../lib/interfaces'
import useTranslations from '../../lib/useTranslations'
import RegistrationSubForm from '../form/RegistrationSubForm'
import { Registration, registrationInitialValues } from '../form/schema'

interface Props {
  initiative: Initiative
  workshopId: string
}

const WorkshopField: FC<Props & FieldProps> = ({
  field,
  initiative,
  workshopId
}) => {
  const registrations = field.value as Registration[]
  const { name } = field
  const workshop = initiative.Workshops__r.records.find(
    w => w.Id === workshopId
  ) as Workshop
  const t = useTranslations('Form')
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Accordion disableGutters defaultExpanded sx={{ my: 3 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6'>{workshop?.Name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Alert severity='info'>
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
        <FieldArray name={field.name}>
          {({ push, remove }) => (
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, newTab: number) => {
                    setActiveTab(newTab)
                  }}
                >
                  {registrations.map((registration, i) => (
                    <Tab
                      key={i}
                      label={registration.groupName || `#${i + 1}`}
                    />
                  ))}
                  <IconButton
                    onClick={() => push(registrationInitialValues)}
                    size='large'
                    title={t('sub.workshop.add')}
                  >
                    <AddIcon />
                  </IconButton>
                </Tabs>
              </Box>
              {registrations.map((registration, i) => (
                <Box
                  key={i}
                  sx={{ display: activeTab !== i ? 'none' : 'block', py: 3 }}
                >
                  <RegistrationSubForm nameSpace={`${name}[${i}]`} />
                  <IconButton
                    onClick={() => remove(i)}
                    size='large'
                    title={t('sub.workshop.remove')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </FieldArray>
      </AccordionDetails>
    </Accordion>
  )
}

export default WorkshopField
