import React, { useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import SendIcon from "@mui/icons-material/Send";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

const ChatBody = () => {
  const [value, setValue] = useState(``);
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (value) {
      const newMessages = [...messages, value];
      setMessages(newMessages);
      setValue(``);
    }
  };
  return (
    <Container>
      <Grid
        Container
        justify={"center"}
        style={{ height: window.innerHeight - 50, marginTop: 25 }}
      >
        <div
          style={{
            width: `100%`,
            height: `75vh`,
            border: `1px solid gray`,
            overflowY: `auto`,
          }}
        >
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={message}
                  style={{ textAlign: index % 2 === 1 ? "right" : "left" }}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <Grid
          Container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ widgh: `80%` }}
          marginTop={2}
        >
          <Input
            variant={`outlined`}
            fullWidth
            rowsMax={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id='standard-adornment-password'
            type='text'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={sendMessage}
                >
                  {<SendIcon></SendIcon>}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatBody;
