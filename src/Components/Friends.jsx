import React, { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import { UserImage } from "./UserImage";
import {
  Box,
  Button,
  Typography,
  Divider,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { PersonAdd, PersonRemove, Chat } from "@mui/icons-material";
import { openChat, setFriends,setMessages } from "../state/index";

const Friends = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const chatMode = useSelector((state) => state.chatMode);

  const isFriend =
    post.userId !== user._id && Array.isArray(friends)
      ? friends.find((friend) => friend._id === post.userId)
      : "false";
  //api call for adding and removing friends
  const addRemoveFriend = async () => {
    const response = await fetch(
      `http://localhost:6001/user/addFriend/${user._id}/${post.userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
   // console.log(data.formattedFriends);
    dispatch(setFriends({ friends: data.formattedFriends }));
    console.log(isFriend);
  };

  //api call to get get all chats
  const getChats = async () => {
    
    const response = await fetch(
      `http://localhost:6001/chat/getMessage/${user._id}/${post.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    
    dispatch(setMessages({messages:data}))
   //console.log(data);
  };
  const startChat = async () => {
    const data = {
      mode: true,
      sender: user._id,
      reciever: post.userId,
      sName: `${user.firstName} ${user.lastName}`,
      rName: `${post.firstName} ${post.lastName}`,
    };
     
    dispatch(openChat({ chatMode: data }));
    await getChats();
  };
  return (
    <FlexBetween pb={"1.1rem"}>
      <FlexBetween gap={"0.5rem"} padding={"1rem 0 0 1rem"}>
        <UserImage image={post.userPicturePath} />
        <Box marginLeft="0.4rem">
          <Typography
            sx={{
              textTransform: "capitalize",
              marginTop: "0.4rem",
              "&:hover": { cursor: "pointer", color: "gray" },
            }}
            onClick={() => {
              navigate(`/profile/${post.userId}`);
            }}
          >
            {post.firstName} {post.lastName}
          </Typography>
          <p style={{ marginTop: "0rem", fontSize: "0.8rem", color: "grey" }}>
            {post.location}
          </p>
        </Box>
      </FlexBetween>
      {!chatMode.mode ? (
        <IconButton
          mr="0.5rem"
          onClick={() => {
            addRemoveFriend();
          }}
        >
          {!(post.userId === user._id) &&
            (!isFriend ? (
              <PersonAdd sx={{ marginRight: "1rem" }} />
            ) : (
              <PersonRemove sx={{ marginRight: "1rem" }} />
            ))}
        </IconButton>
      ) : (
        <IconButton onClick={startChat} sx={{ mr: "1rem" }}>
          <Chat />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friends;
