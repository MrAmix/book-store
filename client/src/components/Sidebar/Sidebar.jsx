import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ListItem from '@mui/material/ListItem';
import { Link as RouterLink } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../App";
const drawerWidth = 280; 

export const Sidebar = observer(() => {
  const { globalStore } = React.useContext(AuthContext);
    return (
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
            <List sx={{display: "flex", alignItems: "center",flexDirection:"column"}}>
              {[
                {title:"Редактировать профиль", link:`/users/${globalStore.user.id}/personal`, icon:AccountBoxIcon},
                {title:"Мои заказы", link:`/users/${globalStore.user.id}/orders`, icon:LocalMallIcon},
                {title:"Мои отзывы", link:`/users/${globalStore.user.id}/reviews`, icon:LocalMallIcon},
                {title:"Корзина", link:`/users/${globalStore.user.id}/basket`, icon:RateReviewIcon}
                ].map((el, index) => (  
                <ListItem key={el.title} disablePadding>
                  <RouterLink to={el.link}>
                  <ListItemButton>
                    <ListItemIcon>
                      { <el.icon /> }
                    </ListItemIcon>
                    <ListItemText primary={el.title} />
                  </ListItemButton>
                  </RouterLink>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
      </Drawer>
    );
})