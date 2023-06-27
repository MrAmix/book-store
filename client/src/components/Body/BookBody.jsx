import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button, CardActions } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


export default function MultiActionAreaCard() {
    const style = {
        width: '100%',
        maxWidth: 360,
        
      };
    const [value] = React.useState(5);
    const book = {name:"Шерлок Холмс", price:"999 рублей", description:"Шерлок Холмс – литературный персонаж, созданный талантом английского писателя Артура Конан Дойла (1859–1930). Его произведения, посвященные приключениям знаменитого лондонского частного сыщика, по праву считаются классикой детективного жанра. Общества поклонников дедуктивного метода Холмса распространились по всему миру. Вы тоже можете присоединиться к Всемирному клубу почитателей Шерлока Холмса и его верного друга Ватсона, прочитав эту книгу.",
    preview:"https://avatars.mds.yandex.net/i?id=b0e06e792b82fc8bc9a1cfbb05633ac52c2d3c9d-7553437-images-thumbs&n=13",
    author:"Автор: Артур Конан Дойл"}

  return (
    <Card sx={{display:'flex'}}>
        <CardMedia
          component="img"
          sx={{
            width: 300,
            height: 300,
            maxWidth: '100%',
            maxHeight: '100%',
          }}

          image= {book.preview}
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
          <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      
      <Typography component="legend">Оценка</Typography>
      <Rating name="read-only" value={value} readOnly />
      
    </Box>
      <CardActions>
        <Button size="small" color="primary">
        Купить за {book.price}
        </Button>
      </CardActions>

      <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary="Подробная информация" />
      </ListItem>
      <Divider />
      <ListItem  divider>
        <ListItemText primary="Возрастное ограничение:16+" />
      </ListItem>
      <ListItem >
        <ListItemText primary="Объем:2350 стр. 407 иллюстраций" />
      </ListItem>
      <Divider light/>
    </List>

        </CardContent>
    </Card>
    
    );
}