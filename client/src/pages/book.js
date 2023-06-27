import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import BookBody from "../components/Body/BookBody";
import ReviewBody from "../components/Body/ReviewBody";
import IntroductionReviewBody from "../components/Body/IntroductionReviewBody";

function Book() {
  return [<NavBar />, <BookBody />, <ReviewBody />, <IntroductionReviewBody />];
}

export default Book;
