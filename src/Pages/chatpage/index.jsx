import { React, useState, useRef } from "react";
import Navbar from "../navbar/index";
import WidgetWrapper from "../../Components/WidgetWrapper";
import FlexBetween from "../../Components/FlexBetween";
import FriendListWidget from "../widgets/FriendListWidget";
import MessageWidget from "../../Components/MessageWidget";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  IconButton,
  Divider,
} from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { io } from "socket.io-client";
import { setMessages } from "../../state/index";

//const socket = io.connect("http://localhost:6001");
const ChatPage = () => {
  const socket = useRef();
  const isNonMobileScreen = useMediaQuery("(min-width : 1000px)");
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user._id);
  const chatMode = useSelector((state) => state.chatMode);
  const token = useSelector((state) => state.token);
  const messages = useSelector((state) => state.messages);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [message, setMessage] = useState("");
  const [recieved, setRecieved] = useState(messages);
  const scrollRef = useRef(null);
  //socket connections and methods
  useEffect(() => {
    if (chatMode.sender) {
      socket.current = io("http://localhost:6001");
      socket.current.emit("add-user", userId);
    }
  }, [chatMode]);
  const handleClick = () => {
    const currentDate = new Date()
    socket.current.emit(
      "send-message",
      message,
      chatMode.sender,
      chatMode.reciever,
      currentDate.getHours()
    );
    setMessage("");
    const messageArray = [
      ...recieved,
      {
        sender: chatMode.sender,
        reciever: chatMode.reciever,
        message,
        createdAt: currentDate,
      },
    ];
    setRecieved(messageArray)
    
  };

  useEffect(() => {
    if (chatMode.sender) {
      socket.current.on(
        "recieve-message",
        (message, sender, reciever, date) => {
          const obj = {
            sender: sender,
            reciever: reciever,
            message,
            createdAt: date,
          };
          console.log(message)
          setRecieved((recieved)=>[...recieved,obj])
          return () => socket.current.off("recieve-message");
        }
      );
    }
  }, [socket]);

  //api call for the addMessage route
  const addMessage = async () => {
    const chat = {
      sender: chatMode.sender,
      reciever: chatMode.reciever,
      message,
    };
    const response = await fetch("http://localhost:6001/chat/addMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    });
  };
  useEffect(() => {
    setRecieved(messages);
  }, [messages]);
  
  const scrollToBottom=()=>{
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }
  

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", gap: isNonMobileScreen ? "0" : "3rem" }}>
        <Box
          display={isNonMobileScreen?"unset":"none"}
          width="30%"
          margin={isNonMobileScreen ? "1rem 0rem 0rem 5rem" : "1rem 0 0 2rem"}
        >
          <Box>
            <FriendListWidget userId={userId} />
          </Box>
        </Box>
        <Box
          height={"100%"}
          width={isNonMobileScreen ? "60%" : "100%"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          m="0 1rem"
        > 
          <WidgetWrapper
            width={isNonMobileScreen?"70%":"100%"}
            mt="2rem"
           >
          <Typography
              variant="h2"
              textAlign="center"
              p="10px"
              textTransform="capitalize"
              wid
            >
              {chatMode.rName}
            </Typography>
          </WidgetWrapper>
          <WidgetWrapper
            height="80vh"
            width={isNonMobileScreen ? "70%" : "100%"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            border="1px solid black"
            sx={{overflowY:"scroll"}}
          >
              
            <Box
              height="100%"
              display="flex"
              justifyContent="flex-end"
              flexDirection="column"
              gap="0.5rem"
              
            >
              {recieved.map((message) => {
                return (
                  <Box 
                  alignSelf={
                    message.sender === userId ? "flex-end" : "flex-start"
                  }>
                  <MessageWidget
                    display="inline-block"
                    bgcolor={
                      message.sender === userId
                        ? "rgb(55, 151, 240)"
                        : "rgb(38,38,38)"
                    }
                    margin={
                      message.sender === userId
                        ? "0 0.7rem 0 0rem"
                        : "0 0rem 0 0.7rem"
                    }
                  >
                    {message.message}
                  </MessageWidget >
                  
                  </Box>
                );
              })}
            </Box>

            <FlexBetween gap="0.3rem">
              <TextField
                size="small"
                sx={{
                  width: "100%",
                  paddingTop: "0.5rem",
                  margin: "0.5rem 0rem 0.5rem 0.5rem",
                }}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="...Message"
                value={message}
                ref={scrollRef}
              ></TextField>
              <IconButton
                onClick={() => {
                  handleClick();
                  //scrollToBottom()
                 // addMessage();
                }}
                sx={{ border: `1px solid white` }}
              >
                <SendTwoToneIcon />
              </IconButton>
            </FlexBetween>
          </WidgetWrapper>
        </Box>
      </div>
    </>
  );
};

export default ChatPage;
