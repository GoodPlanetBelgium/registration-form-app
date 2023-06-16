import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'
import { Button, Typography } from '@mui/material'
import getText from '../lib/getText'
import useTranslations from '../lib/useTranslations'

interface Props {
  initiative: SFInitiative
  children: ReactNode
}

const DataGuard = ({ initiative, children }: Props) => {
  const {
    query: { code },
    locale,
    locales,
    ...router
  } = useRouter()

  const t = useTranslations('Language')

  const hasContent =
    !!getText(locale, 'Title', initiative) &&
    initiative.Workshops__r.records.every(
      workshop => !!getText(locale, 'Title', workshop)
    )

  if (hasContent) {
    return <>{children}</>
  }

  console.log(locales?.filter(l => l !== locale || l === 'default'))

  const refreshCache = async () => {
    const result = await fetch(`/api/initiative/${code}/refresh`)
    console.log(await result.json())
    location.reload()
  }

  return (
    <Layout title={t('error.title')}>
      <Typography variant='body1'>{t('error.text')}</Typography>
      {locales
        ?.filter(l => l !== locale && l !== 'default')
        .map((l, i) => (
          <Button
            key={i}
            variant='contained'
            color='info'
            onClick={() => router.push(router.asPath, undefined, { locale: l })}
            sx={{ display: 'block', my: 3 }}
          >
            {t('button.switch', { locale: l })}
          </Button>
        ))}
      <Button
        color={'warning'}
        size='small'
        onClick={refreshCache}
        sx={{ display: 'block', my: 3 }}
      >
        Refresh cache
      </Button>
    </Layout>
  )
}

export default DataGuard
