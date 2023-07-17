import React, { useState, useEffect } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Button, CardActions, Container } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate, useParams } from "react-router-dom";
import ReviewBody from "./ReviewBody";
import { AuthContext } from "../../App";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${
    theme.palette.mode === "dark" ? blue[900] : blue[100]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default function MultiActionAreaCard() {
  const params = useParams();
  const navigate = useNavigate();
  const { globalStore } = React.useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [book, setBook] = useState({});
  const [userReview, setUserReview] = useState("");

  const changeUserReview = (event) => {
    const text = event.target.value;
    console.log(text);
    setUserReview(text);
  };

  const addBasket = async () => {
    if (!globalStore.isAuth) {
      return navigate("/login");
    }

    if (!globalStore.basketId) {
      const response = await fetch(
        `http://localhost:5000/api/users/${globalStore.user.id}/baskets`,
        {
          method: "POST",
          body: JSON.stringify({ bookId: params.id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        globalStore.countBasket++;
        globalStore.setBasket(globalStore.user.id);
        globalStore.hydrateStore();
        return;
      }
    }

    const response = await fetch(
      `http://localhost:5000/api/users/${globalStore.user.id}/baskets/${globalStore.basketId}`,
      {
        method: "PUT",
        body: JSON.stringify({ bookId: params.id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      globalStore.countBasket++;
      globalStore.hydrateStore();
    }
  };

  const style = {
    width: "100%",
    maxWidth: 360,
  };
  const [value] = React.useState(5);

  useEffect(() => {
    const fetchData = async () => {
      if (fetching) {
        const response = await fetch(
          `http://localhost:5000/api/books/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const json = await response.json();

          setBook({ ...json });
          setReviews(json.reviews);
          return;
        }
      }
    };

    fetchData()
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [fetching, book, params]);

  const redirectToPage = () => {
    console.log(book.id);
    navigate(`/book/${book.id}/bookUpdate`);
  };

  const createReview = async () => {
    const res = await fetch(
      `http://localhost:5000/api/books/${params.id}/reviews`,
      {
        method: "POST",
        body: JSON.stringify({
          user_id: globalStore.user.id,
          review: userReview,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      const data = await res.json();

      setReviews([...reviews, data]);
      setUserReview("");
    }
  };
  return (
    <Container>
      <Card sx={{ display: "flex", marginTop: "84px" }}>
        <CardMedia
          component='img'
          sx={{
            width: 360,
            height: 360,
            objectFit: "scale-down",
          }}
          image={`http://localhost:5000/images/${book.preview}`}
          alt='book'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {book.name}
          </Typography>
          <Typography gutterBottom variant='h6' component='div'>
            {`Автор: ${book.author}`}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {book.description}
          </Typography>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Typography component='legend'>Оценка</Typography>
            <Rating name='read-only' value={value} readOnly />
          </Box>
          <CardActions>
            <Button size='small' color='primary' onClick={addBasket}>
              Купить за {book.price?.price} Рублей
            </Button>
          </CardActions>
          <List sx={style} component='nav' aria-label='mailbox folders'>
            <ListItem>
              <ListItemText primary='Подробная информация:' />
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText
                primary={`Возрастное ограничение: ${book.ageLimit}+`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={`"Объем: ${book.pageCount} стр."`} />
            </ListItem>
            <Divider light />
          </List>
        </CardContent>
      </Card>
      {!globalStore.user.is_admin ? (
        <Box>
          <ReviewBody reviews={reviews} />
          <StyledTextarea
            value={userReview}
            onChange={changeUserReview}
            aria-label='empty textarea'
            placeholder='Empty'
          />
          <Button
            color='success'
            fullWidth
            variant='contained'
            onClick={createReview}
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Отправить отзыв
          </Button>
        </Box>
      ) : (
        <Box>
          <Button
            color='success'
            //onClick={handleSubmit(onSubmit)}
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Удалить книгу
          </Button>
          <Button
            color='success'
            onClick={redirectToPage}
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Изменить книгу
          </Button>
        </Box>
      )}
    </Container>
  );
}
