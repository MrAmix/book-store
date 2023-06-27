import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


function ReviewBody() {
  const review = {name:"Шерлок Холмс",description:"Если Стивена Кинга называют королём ужасов, то Конан Дойл, это король детектива.", avatar:"https://mui.com/static/images/avatar/1.jpg" }
  return (
    <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper',height: "100%", position: "center", pointerEvents: "none",}}>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={review.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary= {review.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              
              >{review.description}
                
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={review.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={review.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {review.description}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={review.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={review.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {review.description}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}


export default ReviewBody;