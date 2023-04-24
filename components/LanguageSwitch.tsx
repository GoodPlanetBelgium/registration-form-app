import { Button, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/router'

const LanguageSwitch = () => {
  const router = useRouter()

  const setLanguage = (language: Locale) => {
    router.push(router.asPath, undefined, { locale: language })
  }

  return (
    <ButtonGroup variant='text' color={'inherit'}>
      {(['nl', 'fr'] as Locale[]).map((lang, i) => (
        <Button
          key={i}
          disabled={router.locale === lang}
          onClick={() => setLanguage(lang)}
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default LanguageSwitch
