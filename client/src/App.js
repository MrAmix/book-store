import "./App.css";
import React, { useEffect } from "react";
import Router from "./components/Router/Router";
import Store from "./store/index";
import { observer } from "mobx-react-lite";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/material";
export const globalStore = new Store();
export const AuthContext = React.createContext({ globalStore });

const theme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#0077BE",
    },

    secondary: {
      main: "#0077BE",
    },
    success: {
      main: "#0077BE",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "white",
          textDecoration: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    // Выполняется после монтирования компонента
    document.body.style.backgroundColor = "#FFFFFF"; // Замените цвет на свой
    // Другие стили для элемента body, если необходимо
    return () => {
      // Выполняется при размонтировании компонента (опционально)
      document.body.style.backgroundColor = ""; // Возврат к исходному стилю (если требуется)
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ globalStore }}>
        <Router />
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default observer(App);
