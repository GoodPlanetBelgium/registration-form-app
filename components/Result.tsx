import {
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import useTranslations from '../lib/useTranslations'

interface Props extends SFResult {
  initiative: SFInitiative
}

const Result = ({ registrations, applicant, account, initiative }: Props) => {
  const t = useTranslations('Form')
  const tr = useTranslations('Result')
  const workshopName = (id: string) =>
    initiative.Workshops__r.records.find(workshop => workshop.Id === id)?.Name
  return (
    <>
      <Alert severity='success'>
        <Typography variant='h2'>{tr('title')}</Typography>
        {tr('subtitle')}
      </Alert>
      {/* <Paper sx={{ p: 2, my: 2 }}>
        <Typography variant='h2'>{t('field.school')}</Typography>
      </Paper> */}
      <Paper sx={{ p: 2, my: 2 }}>
        <Typography variant='h2'>{t('sub.contact.title')}</Typography>
        <b>
          {applicant.firstName} {applicant.lastName}
        </b>
        <br />
        <b>{applicant.email}</b>
        <br />
        <b>{applicant.phone}</b>
      </Paper>
      <Paper sx={{ p: 2, my: 2 }}>
        <Typography variant='h2'>{tr('registrations')}</Typography>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{tr('activity')}</TableCell>
                <TableCell>{t('sub.workshop.field.groupName')}</TableCell>
                <TableCell>{t('sub.workshop.field.groupSize')}</TableCell>
                <TableCell>{tr('contactName')}</TableCell>
                <TableCell>{t('field.email')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrations.map(
                (
                  {
                    workshopId,
                    groupName,
                    groupSize,
                    groupContact: { firstName, lastName, email }
                  },
                  i
                ) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{workshopName(workshopId)}</TableCell>
                    <TableCell>{groupName}</TableCell>
                    <TableCell>{groupSize}</TableCell>
                    <TableCell>
                      {firstName} {lastName}
                    </TableCell>
                    <TableCell>{email}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default Result
