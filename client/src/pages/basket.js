import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import BasketBody from "../components/Body/BasketBody";
import { observer } from "mobx-react-lite";

function basket() {
  return [<NavBar />, <BasketBody />];
}

export default observer(basket);
