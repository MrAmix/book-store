import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "../../App";
import { Sidebar } from "../Sidebar/Sidebar";

export default function MultiActionAreaCard() {
  const { globalStore } = React.useContext(AuthContext);
  const [fetching, setFetching]=useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
          if (fetching) {
            const response = await fetch(`http://localhost:5000/api/users/${globalStore.user.id}/baskets/${globalStore.basketId}/books`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (response.ok) {
              const data = await response.json();
              setBooks(data);
            }
          }
        }
        fetchData()
      .catch(console.error).finally(()=>setFetching(false));
  }, [globalStore, fetching]);
  
  const deleteBook = async (bookId) => {
    const response = await fetch(`http://localhost:5000/api/users/${globalStore.user.id}/baskets/${globalStore.basketId}/books/${bookId}`, {
      method: 'DELETE' 
    });
    
    if (response.ok) {
      setBooks(books.filter(b => b.id !== bookId));
      globalStore.countBasket--;
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Card sx={{display:'flex', alignItems: "center"}}>
          <CardContent sx={{width: '100%'}}>
            <Box component="form" noValidate >
              <Typography gutterBottom variant="h5" align="center" component="div">{"Корзина"}</Typography>
              <List>
                {books.map((book) => {
                  return (
                    <ListItem 
                        sx={{width: '100%'}} 
                        key={book.id} 
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => deleteBook(book.id)}>
                            <DeleteIcon />
                          </IconButton>
                      }>
                        <RouterLink to = {`/books/${book.id}`} sx={{textDecoration: 'none', color: 'inherit'}}>
                          <ListItemAvatar>
                            <Avatar 
                              sx={{ 
                                height: "160px",
                                width: "100px", 
                                objectFit: 'cover',
                                marginRight:"35px" 
                              }} 
                              alt="Profile Picture" 
                              src={`http://localhost:5000/images/${book.preview}`} 
                              variant="rounded"
                              />
                          </ListItemAvatar>
                        </RouterLink>
                        <ListItemText 
                          primary={book.name} 
                          secondary={
                            <React.Fragment>
                              <Box>
                                <Rating name="read-only" value={5} readOnly />
                              </Box>
                              <Box>
                                {`Цена: ${book.price.price}`}
                              </Box>
                              <Box>
                                {book.description}
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                  )
                })}
              </List>
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