import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const errorStatus = await globalStore.login(data.LoginName, data.password);
    if (!errorStatus.status) {
      return;
    }
    navigate("/books");
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
  };

  const navigate = useNavigate();
  const { globalStore } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const changeLogin = (value) => {
    setLogin(value);
  };
  const [password, setPassword] = useState("");
  const changePassword = (value) => {
    setPassword(value);
  };
  let errorA = false;

  return (
    <Container component='main' maxWidth='sm'>
      <Card
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
        <Typography component='h1' variant='h5'>
          Авторизация
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("LoginName", { required: true, maxLength: 80 })}
            margin='normal'
            required
            fullWidth
            id='LoginName'
            error={errors?.LoginName?.type ? true : false}
            helperText={catchErrorLogin(errors?.LoginName?.type)}
            label='Login'
            name='LoginName'
          />

          <TextField
            {...register("password", { required: true, maxLength: 80 })}
            error={errors?.password?.type ? true : false}
            helperText={catchErrorPassword(errors?.password?.type)}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item>
              <Link href='registration' variant='body2'>
                {"Еще не зарегистрированы?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default observer(Login);
