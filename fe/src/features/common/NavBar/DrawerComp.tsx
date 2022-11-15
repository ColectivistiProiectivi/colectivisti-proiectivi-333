import { useState } from 'react'
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const pages = ['Browse', 'Contact', 'FAQ']

  return (
    <>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <DrawerButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon color="inherit" />
      </DrawerButton>
    </>
  )
}

const DrawerButton = styled(IconButton)`
  color: #616161;
  margin-left: auto;
`
