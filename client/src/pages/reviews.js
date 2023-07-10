import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import MyReviewsUserBody from "../components/Body/MyReviewsUserBody";
import { observer } from "mobx-react-lite";

function reviews() {
  return [<NavBar />, <MyReviewsUserBody />];
}

export default observer(reviews);
