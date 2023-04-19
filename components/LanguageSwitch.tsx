import { Button, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/router'

const LanguageSwitch = () => {
  const router = useRouter()

  const setLanguage = (language: Locale) => {
    router.push(router.asPath, undefined, { locale: language })
  }

  return (
    <div>
      <IconButton
        size='large'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <Flag />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setLanguage('nl')}>NL</MenuItem>
        <MenuItem onClick={() => setLanguage('fr')}>FR</MenuItem>
      </Menu>
    </div>
  )
}

export default LanguageSwitch
