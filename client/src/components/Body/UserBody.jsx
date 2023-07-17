// import React, { useState, useEffect } from "react";
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Sidebar } from '../Sidebar/Sidebar';
// import { AuthContext } from "../../App";

export default function FixedBottomNavigation() {
  const [value] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  function refreshMessages() {
    
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    return Array.from(new Array(3)).map(
      () => messageExamples[getRandomInt(messageExamples.length)],
    );  
  }  

  return (
    <Box sx={{ display: 'flex' }}>
     
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
    
    

    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List >
        
        
        {messages.map(({ primary, secondary, person }, index) => (
            <ListItem button key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        ))}
      </List>
        
    </Box>
  </Box>
  </Box>
  );
}

const messageExamples = [
  {
      primary: 'Brunch this week?',
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
      primary: 'Birthday Gift',
      secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
      person: '/static/images/avatar/1.jpg',
    },
  {
      primary: 'Recipe to try',
      secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
      person: '/static/images/avatar/2.jpg',
    }
]
