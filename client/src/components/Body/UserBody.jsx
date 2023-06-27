import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import List from '@mui/material/List';
import RateReviewIcon from '@mui/icons-material/RateReview';


const drawerWidth = 280;


export default function ClippedDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
     
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List sx={{display: "flex", alignItems: "center",flexDirection:"column"}}
              href="/user/:id/personal" color="inherit"
            >
              {[{title:"Редактировать профиль",link:"/user/:id/personal",icon:AccountBoxIcon},{title:"Мои заказы", link:"/user/:id/orders",icon:LocalMallIcon},{title:"Мои отзывы",link:"/user/:id/reviews",icon:RateReviewIcon}].map((el) => (

              <ListItem key={el.title} disablePadding>
                <ListItemButton component="a" href={el.link}>

                  <ListItemIcon>
                    { <el.icon /> }
                  </ListItemIcon>
                  <ListItemText primary={el.title} />
                </ListItemButton>
              </ListItem>
            ))}
            </List>
          
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>
  );
}