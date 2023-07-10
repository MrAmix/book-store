import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import MyOrdersUserBody from "../components/Body/MyOrdersUserBody";
import { observer } from "mobx-react-lite";

function orders() {
  return [<NavBar />, <MyOrdersUserBody />];
}

export default observer(orders);
