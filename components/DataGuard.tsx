import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'
import { Button, Typography } from '@mui/material'
import getText from '../lib/getText'

interface Props {
  initiative: SFInitiative
  children: ReactNode
}

const DataGuard = ({ initiative, children }: Props) => {
  const {
    query: { code },
    locale
  } = useRouter()

  const hasContent =
    !!getText(locale, 'Title', initiative) &&
    initiative.Workshops__r.records.every(
      workshop => !!getText(locale, 'Title', workshop)
    )

  if (hasContent) {
    return <>{children}</>
  }

  const refreshCache = async () => {
    const result = await fetch(`/api/initiative/${code}/refresh`)
    console.log(await result.json())
    location.reload()
  }

  return (
    <Layout title={'Language Error'}>
      <Typography variant='body1'>
        This project is not available in the currently selected language.
      </Typography>
      <pre style={{ fontSize: '0.6rem', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(initiative, null, 2)}
      </pre>
      <Button color={'warning'} variant={'contained'} onClick={refreshCache}>
        Refresh cache
      </Button>
    </Layout>
  )
}

export default DataGuard
