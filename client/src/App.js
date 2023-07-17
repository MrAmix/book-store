import "./App.css";
import React, { useEffect } from "react";
import Router from "./components/Router/Router";
import Store from "./store/index";
import { observer } from "mobx-react-lite";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

export const globalStore = new Store();
export const AuthContext = React.createContext({ globalStore });

function App() {
  useEffect(() => {
    console.log(globalStore);

    setInterval(() => {
      console.log(globalStore.isAuth);
    }, 2000);
  }, []);
  return (
    <div>
      <AuthContext.Provider value={{ globalStore }}>
        <Router />
      </AuthContext.Provider>
    </div>
  );
}

export default observer(App);
