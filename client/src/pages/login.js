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

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const errorStatus = await globalStore.login(data.LoginName, data.password);
    if (!errorStatus.status) {
      return;
    }
    navigate("/books");

    // if (!globalStore.isAuth) {
    //   return;
    // }
    console.log(errorStatus);
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

  // export default function App() {

  //       return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //       <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
  //       <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
  //       <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
  //       <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
  //       <select {...register("Title", { required: true })}>
  //         <option value="Mr">Mr</option>
  //         <option value="Mrs">Mrs</option>
  //         <option value="Miss">Miss</option>
  //         <option value="Dr">Dr</option>
  //       </select>

  //       <input {...register("Developer", { required: true })} type="radio" value="Yes" />
  //       <input {...register("Developer", { required: true })} type="radio" value="No" />

  //       <input type="submit" />
  //     </form>
  //   );
  // }

  const navigate = useNavigate();
  const { globalStore } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const changeLogin = (value) => {
    setLogin(value);
    console.log(value);
  };
  const [password, setPassword] = useState("");
  const changePassword = (value) => {
    setPassword(value);
  };
  let errorA = false;

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
          Авторизация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            onChange={(event) => {
              console.log(event);
            }}
            {...register("LoginName", { required: true, maxLength: 80 })}
            margin="normal"
            required
            fullWidth
            id="LoginName"
            error={errors?.LoginName?.type ? true : false}
            helperText={catchErrorLogin(errors?.LoginName?.type)}
            label="Login"
            name="LoginName"
          />

          <TextField
            {...register("password", { required: true, maxLength: 80 })}
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
            Войти
          </Button>
          <Grid container>
            <Grid item>
              <Link href="registration" variant="body2">
                {"Еще не зарегистрированы?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default observer(Login);
