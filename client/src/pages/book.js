import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import BookBody from "../components/Body/BookBody";
// import ReviewBody from "../components/Body/ReviewBody";
// import IntroductionReviewBody from "../components/Body/IntroductionReviewBody";
import { observer } from "mobx-react-lite";

function Book() {
  return [<NavBar />, <BookBody />];
}

export default observer(Book);
