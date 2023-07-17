import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function ReviewBody(props) {
  const { reviews } = props;
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        position: "center",
        pointerEvents: "none",
      }}
    >
      <ListItemText primary='Отзывы:' />
      {reviews.map((review) => (
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar
              alt={review.user.name}
              src={`http://localhost:5000/images/${review.user.avatar}`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={review.user.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {review.text}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ReviewBody;
