import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'
import { Typography } from '@mui/material'
import getText from '../lib/getText'

interface Props {
  initiative: SFInitiative
  children: ReactNode
}

const DataGuard = ({ initiative, children }: Props) => {
  const router = useRouter()

  const lang = router.locale as Locale

  const hasContent =
    !!getText(lang, 'Title', initiative) &&
    initiative.Workshops__r.records.every(
      workshop => !!getText(lang, 'Title', workshop)
    )

  if (hasContent) {
    return <>{children}</>
  }

  return (
    <Layout title={'Language Error'}>
      <Typography variant='body1'>
        This project is not available in the currently selected language.
      </Typography>
      <pre style={{ fontSize: '0.6rem', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(initiative, null, 2)}
      </pre>
    </Layout>
  )
}

export default DataGuard
