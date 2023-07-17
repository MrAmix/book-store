import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdminSidebar } from "../Sidebar/AdminSidebar";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../App";
import { useForm } from "react-hook-form";
import img from "../../img/2023.png";
import FormControl from "@mui/base/FormControl";
import Input from "@mui/base/Input";
import axios from "axios";
import ImageListItem from "@mui/material/ImageListItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";

export default function MultiActionAreaCard() {
  const params = useParams();
  console.log(params.id);
  const { globalStore, setGlobalStore } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  console.log(errors);
  const getAuthors = async () => {
    const response = await fetch("http://localhost:5000/api/authors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // convert the data to json
      const json = await response.json();

      // set state with the result
      setAuthors(json);
      return;
    }
  };

  const getInfoBookByParamId = async (paramsId) => {
    const book = await axios
      .get(`http://localhost:5000/api/books/${paramsId}`)
      .then((res) => res.data);

    setCurrentBook(book);
  };

  const createBook = async () => {
    const res = await fetch(
      `http://localhost:5000/api/books/${params.id}/bookUpdate`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId: globalStore.book.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(createBook);
  };

  //   useEffect(() => {
  //     // declare the async data fetching function
  //     const fetchData = async () => {
  //       if (loading) {
  //         const response = await fetch("http://localhost:5000/api/authors", {
  //           method: "PUT",
  //           //   body: JSON.stringify({
  //           //     author: globalStore.author.id,
  //           //     bookIds: books.map((book) => book.id),
  //           //   }),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         if (response.ok) {
  //           // convert the data to json
  //           const json = await response.json();

  //           // set state with the result
  //           setAuthors(json);
  //           return;
  //         }
  //       }
  //     };

  //     fetchData()
  //       .catch(console.error)
  //       .finally(() => setLoading(false));
  //   }, [loading, authors]);

  useEffect(() => {
    getAuthors();
    getInfoBookByParamId(params.id);
  }, []);

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleAvatarChange = async (event) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setImage(e.target.result);
      console.log(e.target.result);
    };
    const file = event.target.files[0]; // Получение выбранного файла

    // Функция, вызываемая после чтения файла
    reader.onload = function (event) {
      const imageUrl = event.target.result; // URL содержимого изображения
      setImage(imageUrl); // Обновление состояния с новым изображением
    };

    reader.readAsDataURL(file); // Чтение файла в формате Data URL
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    const formData = new FormData();
    const { id: author_id } = authors.find(
      (authorObject) => authorObject.name === data.author
    );
    console.log(author_id);
    formData.append("preview", data.preview[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("ageLimit", data.ageLimit);
    formData.append("count", data.count);
    formData.append("pageCount", Number(data.pageCount));
    formData.append("price", data.price.price);
    formData.append("author_id", author_id);
    await axios
      .put(`http://localhost:5000/api/books/${params.id}`, formData)
      .then((res) => {
        console.log("wer");
        window.location.reload();
      });
    console.log(data);
  };
  console.log(authors);
  const changeBookByField = (event, field) => {
    const value = event.target.value;
    if (field === "price") {
      setCurrentBook((prev) => ({
        ...prev,
        [field]: { price: value, currency: prev.price.currency },
      }));
      return;
    }
    console.log("CLICK");
    console.log(value, field);
    setCurrentBook((prev) => ({ ...prev, [field]: value }));
  };

  console.log(currentBook);
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, p: 1, marginTop: "64px" }} component='form'>
        <Card sx={{ display: "flex" }}>
          <CardContent>
            <Box component='form' noValidate onsubmit={handleSubmit(onSubmit)}>
              <Typography
                gutterBottom
                variant='h5'
                align='center'
                component='div'
              >
                {"Изменить книгу"}
              </Typography>
              <ImageListItem
                sx={{
                  height: "120px",
                  width: "120px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex",
                }}
              >
                <img
                  sx={{ pointerEvents: "none" }}
                  src={image ? image : img}
                  alt='User Avatar'
                />
              </ImageListItem>
              <FormControl>
                <Input
                  {...register("preview", { required: true })}
                  id='file-input'
                  type='file'
                  onChange={handleAvatarChange}
                  placeholder=''
                  style={{
                    padding: "5px 0px",
                  }}
                />
              </FormControl>
              <TextField
                {...register("name", {
                  required: true,
                  maxLength: 80,
                  value: currentBook?.name,
                })}
                value={currentBook?.name}
                onChange={(e) => changeBookByField(e, "name")}
                size='small'
                margin='normal'
                required
                fullWidth
                id='name'
                helperText='Введите название книги.'
                name='name'
              />
              <TextField
                {...register("description", {
                  required: true,
                  value: currentBook?.description,
                })}
                value={currentBook?.description}
                onChange={(e) => changeBookByField(e, "description")}
                size='small'
                margin='normal'
                required
                fullWidth
                id='description'
                helperText='Введите описание книги.'
                name='description'
                autoComplete='description'
              />
              <TextField
                {...register("price", {
                  required: true,
                  maxLength: 80,
                  value: currentBook?.price,
                })}
                value={currentBook?.price?.price}
                onChange={(e) => changeBookByField(e, "price")}
                size='small'
                margin='normal'
                required
                fullWidth
                helperText='Введите цену книги.'
                name='price'
                type='price'
                id='price'
              />
              <TextField
                {...register("ageLimit", {
                  required: true,
                  maxLength: 80,
                  value: currentBook?.ageLimit,
                })}
                value={currentBook?.ageLimit}
                onChange={(e) => changeBookByField(e, "ageLimit")}
                size='small'
                margin='normal'
                required
                fullWidth
                helperText='Введите возрастное ограничение.'
                name='ageLimit'
                type='ageLimit'
                id='ageLimit'
              />
              <TextField
                {...register("pageCount", {
                  required: true,
                  maxLength: 80,
                  value: currentBook?.pageCount,
                })}
                value={currentBook?.pageCount}
                onChange={(e) => changeBookByField(e, "pageCount")}
                size='small'
                margin='normal'
                required
                fullWidth
                helperText='Введите количество страниц.'
                name='count'
                type='count'
                id='count'
              />
              <TextField
                {...register("count", {
                  required: true,
                  maxLength: 80,
                  value: currentBook?.count,
                })}
                value={currentBook?.count}
                onChange={(e) => changeBookByField(e, "count")}
                size='small'
                margin='normal'
                required
                fullWidth
                helperText='Введите Количество экземпляров'
                name='count'
                type='count'
                id='count'
              />
              <Select
                {...register("author", {
                  value: currentBook?.author,
                })}
                value={currentBook?.author}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Выберите автора'
                onChange={handleAuthorChange}
              >
                {authors.map((author) => (
                  <MenuItem value={author.id}>{author.name}</MenuItem>
                ))}
              </Select>
              <Button
                color='success'
                type='submit'
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Подтвердить
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
