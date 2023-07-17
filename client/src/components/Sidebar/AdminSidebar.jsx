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
import { useNavigate } from "react-router-dom";
const drawerWidth = 280; 

export const AdminSidebar = observer(() => {
    const { globalStore } = React.useContext(AuthContext);
    const navigate = useNavigate();
    
    const listItems = [
        {title:"Создать книгу", link:`/bookCreate`, icon:AccountBoxIcon},
        {title:"Создать автора", link:`/authorCreate`, icon:AccountBoxIcon},
    ];
    
    const logout = async () => {
      globalStore.logout()
      navigate("/books");
    }

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
              {listItems.map((el, index) => (  
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
              <ListItem key={'logout'} disablePadding>
                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      { <RateReviewIcon /> }
                    </ListItemIcon>
                    <ListItemText primary={"Выход"} />
                  </ListItemButton>
                </ListItem>
            </List>
            <Divider />
          </Box>
      </Drawer>
    );
})