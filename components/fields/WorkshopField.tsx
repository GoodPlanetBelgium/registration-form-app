import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { FieldArray } from 'formik'
import { FieldProps } from 'formik'
import { FC } from 'react'
import { Initiative } from '../../lib/interfaces'
import useTranslations from '../../lib/useTranslations'
import RegistrationSubForm from '../form/RegistrationSubForm'
import { Registration } from '../form/schema'

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
  )
  const t = useTranslations('Form')
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6'>{workshop?.Name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FieldArray name={field.name}>
          {({ push, remove }) => (
            <Box>
              <Stack spacing={2}>
                {registrations.map((registration, i) => (
                  <Paper key={i} sx={{ p: 1 }}>
                    <RegistrationSubForm nameSpace={`${name}[${i}]`} />
                    <Button
                      color='primary'
                      variant='contained'
                      sx={{ my: 1 }}
                      onClick={() => remove(i)}
                    >
                      {t('sub.workshop.remove')}
                    </Button>
                  </Paper>
                ))}
              </Stack>
              <Button
                color='primary'
                variant='contained'
                sx={{ my: 1 }}
                onClick={() =>
                  push({ groupName: '', groupContact: { name: '', email: '' } })
                }
              >
                {t('sub.workshop.add')}
              </Button>
            </Box>
          )}
        </FieldArray>
      </AccordionDetails>
    </Accordion>
  )
}

export default WorkshopField
