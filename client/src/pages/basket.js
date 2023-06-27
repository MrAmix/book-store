import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import MyOrdersUserBody from "../components/Body/MyOrdersUserBody";

function basket() {
  return [<NavBar />, <MyOrdersUserBody />];
}

export default basket;
