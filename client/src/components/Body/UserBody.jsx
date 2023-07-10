import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link as RouterLink } from "react-router-dom";
import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 280;


function refreshMessages() {
    
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(3)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}

export default function FixedBottomNavigation() {
  const [value] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

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
              {[{title:"Редактировать профиль",link:"/user/:id/personal",icon:AccountBoxIcon},{title:"Мои заказы", link:"/user/:id/orders",icon:LocalMallIcon},{title:"Мои отзывы",link:"/user/:id/reviews",icon:RateReviewIcon},{title:"Корзина",link:"/user/:id/basket",icon:ShoppingCartIcon}].map((el, index) => (

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
    
    

    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List >
        
        {messages.map(({ primary, secondary, person }, index) => (
            <ListItem button key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        ))}
      </List>
        
    </Box>
  </Box>
  </Box>
  );
}

const messageExamples = [
  {
      primary: 'Brunch this week?',
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
      primary: 'Birthday Gift',
      secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
      person: '/static/images/avatar/1.jpg',
    },
  {
      primary: 'Recipe to try',
      secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
      person: '/static/images/avatar/2.jpg',
    }
]
