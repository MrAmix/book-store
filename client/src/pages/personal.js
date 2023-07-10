import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import PersonalDataUserBody from "../components/Body/PersonalDataUserBody";
import { observer } from "mobx-react-lite";

function personal() {
  return [<NavBar />, <PersonalDataUserBody />];
}

export default observer(personal);
