import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import UserBody from "../components/Body/UserBody";
import { observer } from "mobx-react-lite";

function user() {
  return [<NavBar />, <UserBody />];
}

export default observer(user);
