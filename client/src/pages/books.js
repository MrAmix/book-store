import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import Test from "../components/test/test";
import BooksBody from "../components/Body/BooksBody";

function Books() {
  return [<NavBar />, <Test />, <BooksBody />];
}

export default Books;
