import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdminSidebar } from "../Sidebar/AdminSidebar";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../App";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function MultiActionAreaCard() {
  const { globalStore, setGlobalStore } = React.useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    console.log(123);
    await axios
      .post(`http://localhost:5000/api/authors`, { name: formData.get("name") })
      .then((res) => {
        reset();
      });
  };

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
                {"Создание автора книги"}
              </Typography>
              <TextField
                size='small'
                margin='normal'
                required
                fullWidth
                helperText='Введите автора книг'
                name='author'
                type='author'
                id='author'
                {...register("name", { required: true, maxLength: 80 })}
              />
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
