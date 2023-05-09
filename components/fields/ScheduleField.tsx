import { FieldProps, getIn } from 'formik'
import { FC, useEffect, useReducer } from 'react'
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

interface Action {
  type: 'RESET' | 'SET' | 'ADD_PAUSE' | 'REMOVE_PAUSE' | 'UPDATE_PAUSE'
  payload?: {
    key?: any
    value: any
  }
}

interface State {
  start: string
  end: string
  pauses: string
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
  field,
  form: { setFieldValue, touched, errors },
  label
}) => {
  const t = useTranslations('Form')

  const initState = (value: string) => {
    const periods = !!value ? value.split('\r\n') : []
    let pauses = []
    for (let i = 0; i < periods.length - 1; i++) {
      pauses.push([periods[i].split('-')[1], periods[i + 1].split('-')[0]])
    }
    return {
      start: periods[0]?.split('-')[0] || '',
      end: periods.slice(-1)[0]?.split('-')[1] || '',
      pauses: JSON.stringify(pauses)
    }
  }

  const reducer = (state: State, action: Action) => {
    const { type, payload } = action
    switch (type) {
      case 'RESET':
        return initState(field.value)
      case 'SET':
        return {
          ...state,
          [payload?.key]:
            payload?.value.isValid() && payload?.value.format('HH:mm')
        }
      case 'ADD_PAUSE':
        return {
          ...state,
          pauses: JSON.stringify([...JSON.parse(state.pauses), ['', '']])
        }
      case 'REMOVE_PAUSE':
        const parsedPauses = JSON.parse(state.pauses)
        parsedPauses.splice(payload?.value, 1)
        return {
          ...state,
          pauses: JSON.stringify(parsedPauses)
        }
      case 'UPDATE_PAUSE':
        if (payload?.value.isValid()) {
          const [i, j] = payload.key
          const parsedPauses = JSON.parse(state.pauses)
          parsedPauses[i][j] = payload.value.format('HH:mm')
          return {
            ...state,
            pauses: JSON.stringify(parsedPauses)
          }
        }
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initState(field.value))

  const parseTime = (t: string | undefined) =>
    t
      ? dayjs()
          .set('h', parseInt(t.split(':')[0]))
          .set('m', parseInt(t.split(':')[1]))
      : null

  useEffect(() => {
    const parsedPauses: string[][] = JSON.parse(state.pauses)
    setFieldValue(
      field.name,
      `${state.start || ''}-${parsedPauses
        .map(pause => pause.join('\r\n'))
        .join('-')}${parsedPauses.length > 0 ? '-' : ''}${state.end || ''}`
    )
  }, [field.name, setFieldValue, ...Object.values(state)])

  useEffect(() => {
    dispatch({ type: 'RESET' })
  }, [field.value])

  const error = (getIn(touched, field.name) && getIn(errors, field.name)) || ''

  return (
    <Section label={label} error={Boolean(error)}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <TimeField
          label={t('field.schedule.start')}
          value={parseTime(state.start)}
          onChange={(date: Dayjs) =>
            dispatch({ type: 'SET', payload: { key: 'start', value: date } })
          }
        />
        {(JSON.parse(state.pauses) as string[][]).map((pause, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
            <TimeField
              label={`${t('field.schedule.break', { n: i + 1 })} ${t(
                'field.schedule.start'
              )}`}
              value={parseTime(pause[0])}
              onChange={(date: Dayjs) =>
                dispatch({
                  type: 'UPDATE_PAUSE',
                  payload: { key: [i, 0], value: date }
                })
              }
            />
            <TimeField
              label={`${t('field.schedule.break', { n: i + 1 })} ${t(
                'field.schedule.end'
              )}`}
              value={parseTime(pause[1])}
              onChange={(date: Dayjs) =>
                dispatch({
                  type: 'UPDATE_PAUSE',
                  payload: { key: [i, 1], value: date }
                })
              }
            />
            <Button
              variant='text'
              color='inherit'
              onClick={() =>
                dispatch({ type: 'REMOVE_PAUSE', payload: { value: i } })
              }
            >
              <DeleteOutline />
            </Button>
          </Box>
        ))}
        <Button
          sx={{ my: 1 }}
          variant='contained'
          color='success'
          onClick={() => dispatch({ type: 'ADD_PAUSE' })}
        >
          <AddIcon />
          {t('field.schedule.addBreak')}
        </Button>
        <TimeField
          label={t('field.schedule.end')}
          value={parseTime(state.end)}
          onChange={(date: Dayjs) =>
            dispatch({ type: 'SET', payload: { key: 'end', value: date } })
          }
        />
      </Box>
      {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
    </Section>
  )
}

export default ScheduleField
