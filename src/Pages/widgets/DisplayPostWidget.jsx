import React, { useEffect, useState } from "react";
import WidgetWrapper from "../../Components/WidgetWrapper";
import FlexBetween from "../../Components/FlexBetween";
import { UserImage } from "../../Components/UserImage";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { PersonAdd, FavoriteBorder, Comment, Share,Favorite } from "@mui/icons-material";
import { setPosts,likePost } from "../../state/index";
import Friends from "../../Components/Friends";

const DisplayPostWidget = ({userId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  
  const posts = useSelector((state)=> state.posts);
  const token = useSelector((state) => state.token);
  const user = useSelector((state)=>state.user)
  const [liked,setLiked] = useState(false)
  const [allPosts, setAllPosts] = useState([]);
 // const [likeNumber,setLikeNumber] = useState(Object.keys(post.likes).length)
  const fetchAllPosts = async () => {
    const response = await fetch("http://localhost:6001/post/getAllFeeds", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const allPosts = await response.json();
    allPosts.posts.reverse();
    setAllPosts(allPosts.posts);
    dispatch(setPosts({ posts: allPosts.posts }));
  };
  const fetchUserPosts = async () => {
    const response = await fetch(
      `http://localhost:6001/post/getUserFeed/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const allPosts = await response.json();

    setAllPosts(allPosts.posts);
    dispatch(setPosts({ posts: allPosts.posts }));
  };

  const likePosts = async (postId)=>{
    const response = await fetch(
      `http://localhost:6001/post/like/${postId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`,
                   "Content-Type" : "application/json"
                  },
      }
    );
    const data = await response.json()
    
    const updatedPost = posts.map((post)=>{
      if(post._id===postId){
        return {...post,likes:data.data.likes}
      }
      else 
      return post
    })
    dispatch(likePost({posts:updatedPost}))
    // console.log(data.data.likes)
    // console.log(data.data)
  }

  useEffect(() => {
    if(window.location.href.includes('home')){
    fetchAllPosts();
    }
    else if(window.location.href.includes('profile')) 
    {
      fetchUserPosts()
    }

  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <WidgetWrapper margin="1rem 0" border="1px solid black">
            <Friends post={post} key={post._id}/>
            <Box display="flex" justifyContent="center">
              <Box padding="0 2rem">
                <img
                  src={`http://localhost:6001/assets/${post.picturePath}`}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    borderRadius: "0.75rem",
                  }}
                  alt=""
                />
                <Typography
                  fontSize="0.75rem"
                  width={isNonMobileScreen ? "80%" : "75%"}
                  pt="0.75rem"
                >
                  {post.description}
                </Typography>
                <FlexBetween>
              <FlexBetween>
                <IconButton onClick={()=>{likePosts(post._id)}}>
                {(user._id in post.likes)?<Favorite/>:<FavoriteBorder />}
                </IconButton >
                {Object.keys(post.likes).length}
              </FlexBetween>
              <Share />
            </FlexBetween>
              </Box>
            </Box>

           
          </WidgetWrapper>
        );
      })}
    </>
  );
};

export default DisplayPostWidget;
