import React from "react";
import NavBar from "../components/NavBar/booksNavbar";
import ChatBody from "../components/Body/ChatBody";
import { observer } from "mobx-react-lite";

function Chat() {
  return [<NavBar />, <ChatBody />];
}

export default observer(Chat);
