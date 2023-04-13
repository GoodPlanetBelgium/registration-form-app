import { FieldProps, getIn } from 'formik'
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import useTranslations from '../../lib/useTranslations'
import { TimeField as TF } from '@mui/x-date-pickers'
import { Box, Button, FormHelperText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Section from '../Section'
import dayjs, { Dayjs } from 'dayjs'
import { DeleteOutline } from '@mui/icons-material'

interface SFProps {
  label: string
}

const TimeField = (props: {
  label: string
  value: any
  onChange: (date: any) => void
}) => (
  <TF
    sx={{ my: 1, mr: 1, width: 120 }}
    format='HH:mm'
    size='small'
    {...props}
  />
)

const ScheduleField: FC<SFProps & FieldProps> = ({
  field: { name, value },
  form: { setFieldValue, touched, errors },
  label
}) => {
  const t = useTranslations('Form')

  const [periods] = useState<string[]>(!!value ? value.split('\r\n') : [])
  const [start, setStart] = useState(periods[0]?.split('-')[0] || '')
  const [end, setEnd] = useState(periods.slice(-1)[0]?.split('-')[1] || '')
  const [pauses, setPauses] = useState(
    JSON.stringify(
      periods.length > 1
        ? periods.map((period, i) => [
            period.split('-')[1],
            periods[i + 1].split('-')[0]
          ])
        : []
    )
  )

  const addPause = () =>
    setPauses(prevPauses =>
      JSON.stringify([...JSON.parse(prevPauses), ['', '']])
    )

  const removePause = (n: number) => {
    const parsedPauses = JSON.parse(pauses)
    parsedPauses.splice(n, 1)
    setPauses(JSON.stringify(parsedPauses))
  }

  const updatePause = (i: number, j: number) => (date: Dayjs) => {
    if (date.isValid()) {
      const parsedPauses = JSON.parse(pauses)
      parsedPauses[i][j] = date.format('HH:mm')
      setPauses(JSON.stringify(parsedPauses))
    }
  }

  const parseTime = (t: string | undefined) =>
    t
      ? dayjs()
          .set('h', parseInt(t.split(':')[0]))
          .set('m', parseInt(t.split(':')[1]))
      : null

  const setTime = (set: Dispatch<SetStateAction<string>>) => (date: Dayjs) =>
    date.isValid() && set(date.format('HH:mm'))

  useEffect(() => {
    const parsedPauses: string[][] = JSON.parse(pauses)
    setFieldValue(
      name,
      `${start || ''}-${parsedPauses
        .map(pause => pause.join('\r\n'))
        .join('-')}${parsedPauses.length > 0 ? '-' : ''}${end || ''}`
    )
  }, [start, pauses, end, name, setFieldValue])

  const error = (getIn(touched, name) && getIn(errors, name)) || ''

  return (
    <Section label={label} error={Boolean(error)}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <TimeField
          label={t('field.schedule.start')}
          value={parseTime(start)}
          onChange={setTime(setStart)}
        />
        {(JSON.parse(pauses) as string[][]).map((pause, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
            <TimeField
              label={`${t('field.schedule.break', { n: i + 1 })} ${t(
                'field.schedule.start'
              )}`}
              value={parseTime(pause[0])}
              onChange={updatePause(i, 0)}
            />
            <TimeField
              label={`${t('field.schedule.break', { n: i + 1 })} ${t(
                'field.schedule.end'
              )}`}
              value={parseTime(pause[1])}
              onChange={updatePause(i, 1)}
            />
            <Button
              variant='text'
              color='inherit'
              onClick={() => removePause(i)}
            >
              <DeleteOutline />
            </Button>
          </Box>
        ))}
        <Button
          sx={{ my: 1 }}
          variant='contained'
          color='success'
          onClick={addPause}
        >
          <AddIcon />

          {t('field.schedule.addBreak')}
        </Button>
        <TimeField
          label={t('field.schedule.end')}
          value={parseTime(end)}
          onChange={setTime(setEnd)}
        />
      </Box>
      {Boolean(error) && (
        <FormHelperText error sx={{ ml: 2 }}>
          {error}
        </FormHelperText>
      )}
    </Section>
  )
}

export default ScheduleField
