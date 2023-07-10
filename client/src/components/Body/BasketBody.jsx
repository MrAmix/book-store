import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from 'react-avatar-edit';
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
    const book = {name:"Андрей", preview:"https://images.chesscomfiles.com/uploads/v1/user/77559592.9cb711dc.160x160o.e195dd620cda@2x.jpeg",
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
      <Avatar>
        <CardMedia
          component="img"
          sx={{
            width: 160,
            height: 160,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          
          image= {book.preview}
          alt="book"
          
          />
        </Avatar>
        <TextField
          size='small'
            margin="normal"
            required
            fullWidth
            id="email"
            helperText="Введите новый имя для изменения."
            label="Имя"
            name="name"
            autoComplete="name"
            autoFocus
            />
          <TextField
          size='small'
            margin="normal"
            required
            fullWidth
            id="login"
            helperText="Введите новый логин для изменения."
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
            />
          <TextField
          size='small'
            margin="normal"
            required
            fullWidth
            helperText="Введите старый пароль для изменения."
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <TextField
          size='small'
            margin="normal"
            required
            fullWidth
            helperText="Введите новый пароль для изменения."
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <Button
            color='success'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Подтвердить
          </Button>
          </Box>
          </CardContent>
    </Card>
    
    
            </Box>
          </Box>
    );
}