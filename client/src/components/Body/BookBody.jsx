import React, {useState,useEffect} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button, CardActions, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate, useParams } from "react-router-dom";
import ReviewBody from "./ReviewBody";
import IntroductionReviewBody from "./IntroductionReviewBody";
import { AuthContext } from "../../App";


export default function MultiActionAreaCard() {
  const params = useParams();
  const navigate = useNavigate();
  const { globalStore } = React.useContext(AuthContext);
  
 const addBasket = async () => {
   if (!globalStore.isAuth){
   return navigate("/login")
  }

   if(!globalStore.basketId){
     const response = await fetch(`http://localhost:5000/api/users/${globalStore.user.id}/baskets`, {
       method: "POST",
       body: JSON.stringify({ bookId:params.id }),
       headers: {
         "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        globalStore.countBasket++;
      }
      
    }
    const response = await fetch(`http://localhost:5000/api/users/${globalStore.user.id}/baskets/${globalStore.basketId}`, {
       method: "PUT",
       body: JSON.stringify({ bookId:params.id }),
       headers: {
         "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        globalStore.countBasket++;
      }
  }

  const [fetching,setFetching]=useState(true)
  const [book, setBook] = useState({});
  const style = {
    width: '100%',
    maxWidth: 360,    
  };
  const [value] = React.useState(5);

  useEffect(() => {
    const fetchData = async () => {
      if (fetching) {
        const response = await fetch(`http://localhost:5000/api/books/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const json = await response.json();
  
          console.log(json);
          setBook({...json});

          return
        }
      }
    }
  
    fetchData().catch(console.error).finally(()=>setFetching(false));
  }, [fetching,book,params])

  return (
  <Container>
    <Card sx={{display:'flex'}}>
      <CardMedia
        component="img"
        sx={{
          width: 360,
          height: 360,
          objectFit: "scale-down"
        }}
        image= {`http://localhost:5000/images/${book.preview}`}
        alt="book"
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.description}
        </Typography>
        <Box sx={{'& > legend': { mt: 2 }}}>
          <Typography component="legend">Оценка</Typography>
          <Rating name="read-only" value={value} readOnly />      
        </Box>
        <CardActions>
          <Button size="small" color="primary" onClick={addBasket}>
            Купить за  {book.price?.price}
          </Button>
        </CardActions>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem>
            <ListItemText primary="Подробная информация" />
          </ListItem>
          <Divider />
          <ListItem  divider>
            <ListItemText primary={`Возрастное ограничение:${book.ageLimit}+`} />
          </ListItem>
          <ListItem >
            <ListItemText primary={`"Объем:${book.pageCount} стр."`} />
          </ListItem>
          <Divider light/>
        </List>
      </CardContent>
    </Card>
    <ReviewBody reviews={book.reviews || []}/>
    <IntroductionReviewBody/>
  </Container>
  );
}