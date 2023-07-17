import React from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import { Link as RouterLink } from "react-router-dom";

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { AuthContext } from "../../App";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { observer } from 'mobx-react-lite'


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

 function BooksNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { globalStore } = React.useContext(AuthContext);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
      <MenuItem onClick={handleMenuClose}>Мои отзывы</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new books"
          color="inherit"
        >
          <Badge badgeContent={globalStore.countBasket} color="error" >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
      <RouterLink to={globalStore.isAuth ? `/user/${globalStore.user.id}/basket` : "/login"} color="inherit">

      <Link
              //href="/user/:id/basket" color="inherit"
            >
              Button Link
            </Link>
            </RouterLink>
      </MenuItem>
    </Menu>
  );

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
      <RouterLink to="/books" color="inherit">

        <List sx={{display: "flex", alignItems: "center",flexDirection:"column"}}
            >
              {[{title:"Книжка для братишки",icon:AutoStoriesIcon}].map((el) => (

              <ListItem key={el.title} disablePadding color="inherit">
                <ListItemButton >

                  <ListItemIcon>
                    { <el.icon /> }
                  </ListItemIcon>
                  <ListItemText primary={el.title} />
                </ListItemButton>
              </ListItem>
            ))}
            </List>
            </RouterLink>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Найти книгу…"
              inputProps={{ "aria-label": "search" }}
            />
            
          </Search>
          <RouterLink to={"/chat"} color="inherit">
            
          <Link sx={{display: "flex", alignItems: "center"}}
             color="inherit"
            >

              Онлайн чат
            </Link>
            </RouterLink>
          {globalStore.user.is_admin ? (
            <RouterLink to={"/bookCreate"} color="inherit">
              <Link 
                sx={{
                  display: "flex", 
                  alignItems: "center",
                  marginLeft:"10px"
                }}
                color="inherit"
              >
                Создать книгу
               </Link>
            </RouterLink>) : (
              undefined
            )
          } 
           

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex",  } }}>
            {!globalStore.user.is_admin ? (

              <RouterLink to={globalStore.isAuth ? `/users/${globalStore.user.id}/basket` : "/login"} color="inherit">
            <IconButton
              size="large"
              aria-label="show count new books"
              color="inherit"
              >
              <Badge badgeContent={globalStore.countBasket} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            </RouterLink>
              ) : (undefined)}
            
            {globalStore.isAuth ? (
              <RouterLink to={`/users/${globalStore.user.id}/personal`} color="inherit">
              <Link sx={{display: "flex", alignItems: "center"}}  color="inherit">
                <Avatar alt="Remy Sharp" src={`http://localhost:5000/images/${globalStore.user.avatar}`}>
                  <PersonIcon/>
                </Avatar>
              </Link>
              </RouterLink>
              ) : (
                <Link sx={{display: "flex", alignItems: "center"}} href="/login" color="inherit">
                  Войти
                </Link>
              )
            }
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
  

}

export default observer(BooksNavbar)