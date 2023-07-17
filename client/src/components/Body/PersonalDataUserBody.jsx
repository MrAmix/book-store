import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Sidebar } from "../Sidebar/Sidebar";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../App";
import { useForm } from "react-hook-form";
import img from "../../img/2023.png";
import FormControl from "@mui/base/FormControl";
import Input from "@mui/base/Input";
import axios from "axios";
import ImageListItem from "@mui/material/ImageListItem";
import { useNavigate } from "react-router-dom";

export default function MultiActionAreaCard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { globalStore, setGlobalStore } = React.useContext(AuthContext);
  const { user } = globalStore;

  const [image, setImage] = useState(null);

  useEffect(
    (image) => {
      const loadImage = async () => {
        const res = await fetch(
          `http://localhost:5000/images/${globalStore.user.avatar}`
        );
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(res.url);
        setImage(res.url);
        setLoading(false);
        return new File([imageBlob], globalStore.user.avatar, {
          type: imageBlob.type,
        });
      };
      const presetValue = () => {
        reset({
          name: globalStore.user.name,
          login: globalStore.user.login,
        });
      };
      loadImage();
      presetValue();
    },
    [globalStore, reset]
  );

  console.log(image);
  const handleAvatarChange = async (event) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      setImage(e.target.result);
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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("login", data.login);
    formData.append("password", data.password);
    if (data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    } else {
      const response = await fetch(
        `http://localhost:5000/images/${globalStore.user.avatar}`
      );
      const data = await response.blob();
      const metadata = {
        type: data.type,
      };
      const file = new File([data], globalStore.user.avatar, metadata);
      formData.append("avatar", file);
    }

    console.log(formData);

    await axios
      .put(`http://localhost:5000/api/users/${globalStore.user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        globalStore.setUser(res.data.user);
        globalStore.hydrateStore();
        navigate("/books");
      });
    console.log(data);
  };

  return (
    <Box sx={{ display: "flex", marginTop: "50px" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1 }} component='form'>
        <Card sx={{ display: "flex" }}>
          <CardContent>
            <Box component='form' noValidate onsubmit={handleSubmit(onSubmit)}>
              <Typography
                gutterBottom
                variant='h5'
                align='center'
                component='div'
              >
                {user.name}
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
                  {...register("avatar")}
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
                size='small'
                margin='normal'
                required
                fullWidth
                id='name'
                helperText='Введите новое имя для изменения'
                name='name'
                autoComplete='name'
                {...register("name", { required: true, maxLength: 80 })}
                autoFocus
              />
              <TextField
                size='small'
                margin='normal'
                required
                fullWidth
                id='login'
                helperText='Введите новый логин для изменения.'
                name='login'
                autoComplete='login'
                {...register("login", { required: true, maxLength: 80 })}
              />
              <TextField
                size='small'
                margin='normal'
                required
                fullWidth
                helperText='Введите новый пароль для изменения.'
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
                {...register("password", { required: true, maxLength: 80 })}
              />
              <Button
                color='success'
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
