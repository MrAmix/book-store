import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import AuthorCreateBody from "../components/Body/AuthorCreateBody";
import { observer } from "mobx-react-lite";

function BookCreate() {
  return [<NavBar />, <AuthorCreateBody />];
}

export default observer(BookCreate);
