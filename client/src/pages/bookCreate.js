import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import BookCreateBody from "../components/Body/BookCreateBody";
import { observer } from "mobx-react-lite";

function BookCreate() {
  return [<NavBar />, <BookCreateBody />];
}

export default observer(BookCreate);
