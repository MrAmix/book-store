import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import CarouselEffect from "../components/Carousel/carouselEffect";
import BooksBody from "../components/Body/BooksBody";
import { observer } from "mobx-react-lite";

function Books() {
  return [<NavBar />, <CarouselEffect />, <BooksBody />];
}

export default observer(Books);
