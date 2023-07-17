import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Sidebar } from "../Sidebar/Sidebar";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../App";

export default function MultiActionAreaCard() {
  const { globalStore } = React.useContext(AuthContext);
  const [fetching, setFetching] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (fetching) {
        const response = await fetch(
          `http://localhost:5000/api/users/${globalStore.user.id}/reviews`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      }
    };
    fetchData()
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [globalStore, fetching]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 1 }}>
        <Card sx={{ display: "flex", alignItems: "center" }}>
          <CardContent sx={{ width: "100%" }}>
            <Box>
              <Typography
                gutterBottom
                variant='h5'
                align='center'
                component='div'
              >
                {"Отзывы"}
              </Typography>
              <List>
                {reviews.map((review) => {
                  return (
                    <ListItem sx={{ width: "100%" }} key={review.id}>
                      <RouterLink
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              height: "160px",
                              width: "100px",
                              objectFit: "cover",
                              marginRight: "35px",
                            }}
                            alt='Profile Picture'
                            src={`http://localhost:5000/images/${review.book_preview}`}
                            variant='rounded'
                          />
                        </ListItemAvatar>
                      </RouterLink>
                      <ListItemText
                        primary={review.book_name}
                        secondary={
                          <React.Fragment>
                            <Box>
                              <Rating name='read-only' value={5} readOnly />
                            </Box>

                            <Box>{`Отзыв: ${review.text}`}</Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
