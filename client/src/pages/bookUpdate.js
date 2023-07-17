import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import BookUpdateBody from "../components/Body/BookUpdateBody";
import { observer } from "mobx-react-lite";

function BookUpdate() {
  return [<NavBar />, <BookUpdateBody />];
}

export default observer(BookUpdate);
