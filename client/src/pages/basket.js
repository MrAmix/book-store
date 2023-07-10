import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import MyOrdersUserBody from "../components/Body/MyOrdersUserBody";
import { observer } from "mobx-react-lite";

function basket() {
  return [<NavBar />, <MyOrdersUserBody />];
}

export default observer(basket);
