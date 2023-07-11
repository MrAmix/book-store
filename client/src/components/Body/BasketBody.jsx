import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";

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

export default function MultiActionAreaCard() {
  const drawerWidth = 280;
    const book = {name:"Корзина товаров", preview:"https://images.chesscomfiles.com/uploads/v1/user/77559592.9cb711dc.160x160o.e195dd620cda@2x.jpeg",
    }

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
            >
              {[{title:"Редактировать профиль",link:"/user/:id/personal",icon:AccountBoxIcon},{title:"Мои заказы", link:"/user/:id/orders",icon:LocalMallIcon},{title:"Мои отзывы",link:"/user/:id/reviews",icon:RateReviewIcon}].map((el, index) => (

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
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        
  
    <Card sx={{display:'flex'}}>
      

        <CardContent>


    <Box component="form" noValidate >
    <Typography gutterBottom variant="h5" align="center" component="div">
            {book.name}
          </Typography>
    
            <Button
            color='success'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Оформить заказ
          </Button>
          </Box>
          </CardContent>
    </Card>
    
    
            </Box>
          </Box>
    );
}