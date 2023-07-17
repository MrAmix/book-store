import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

export default function Login() {
  const { globalStore } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const errorStatus = await globalStore.registration(
      data.name,
      data.login,
      data.password
    );

    if (!errorStatus.status) {
      return;
    }

    navigate("/login");
  };

  const catchErrorName = (typeError) => {
    if (typeError === "required") {
      return "Поле не должно быть пустым";
    }
    if (typeError === "pattern") {
      return "Имя не должно содержать цифру";
    }
  };
  const catchErrorLogin = (typeError) => {
    if (typeError === "required") {
      return "Поле не должно быть пустым";
    }
  };
  const catchErrorPassword = (typeError) => {
    if (typeError === "required") {
      return "Поле не должно быть пустым";
    }
    if (typeError === "maxLength") {
      return "Пароль слишком длинный";
    }
    if (typeError === "minLength") {
      return "Пароль слишком короткий";
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("name", {
              required: true,
              maxLength: 20,
              pattern: /^[а-яА-Яa-zA-Z\s]+$/,
            })}
            error={errors?.name?.type ? true : false}
            helperText={catchErrorName(errors?.name?.type)}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            {...register("login", { required: true, maxLength: 80 })}
            error={errors?.login?.type ? true : false}
            helperText={catchErrorLogin(errors?.login?.type)}
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
            error={errors?.password?.type ? true : false}
            helperText={catchErrorPassword(errors?.password?.type)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"Уже зарегистрированы?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
