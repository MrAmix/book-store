import "./App.css";
import React from "react";
import Router from "./components/Router/Router";
import Store from "./store/index";
import { observer } from "mobx-react-lite";

const globalStore = new Store();
function App() {
  console.log(globalStore);
  return (
    <div>
      <Router />
    </div>
  );
}

export default observer(App);
