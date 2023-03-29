import { Flag } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LanguageSwitch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const setLanguage = (language: 'nl' | 'fr') => {
    router.push(router.asPath, undefined, { locale: language })
    setAnchorEl(null)
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
