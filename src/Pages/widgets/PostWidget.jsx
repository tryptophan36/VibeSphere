import React, { useEffect, useState } from "react";
import WidgetWrapper from "../../Components/WidgetWrapper";
import FlexBetween from "../../Components/FlexBetween";
import { UserImage } from "../../Components/UserImage";
import {
  Box,
  Button,
  Typography,
  Divider,
  useMediaQuery,
  FormControl,
  TextField,
  InputBase,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";
import Dropzone from "react-dropzone";
import {
  Clear,
  Image,
  AttachFile,
  AudioFile,
  VideoFile,
} from "@mui/icons-material";
import { setPosts } from "../../state/index";

const PostWidget = ({ image }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [postData, setPostData] = useState({ description: "", picture: [] });
  const [isAttchment,setIsAttachment]=useState(false)
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  
  
  const handlePost = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("description", postData.description);
    formData.append("userId",user._id)
    if(isAttchment){
      formData.append("picture",postData.picture)
      formData.append("picturePath", postData.picture.name);
    }
    const response = await fetch(`http://localhost:6001/post/add`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`},
      body:formData,
    });
    const data = await response.json();
    console.log(data)
    setPostData({description:"",picture:[]})
    dispatch(setPosts({data}))
    window.location.reload();
  };
const handleClick = ()=>{
    setIsAttachment(!isAttchment)
}
  return (
    
    <WidgetWrapper mt="2rem" border={"1px solid black"}>
      {/* FIRST ROW*/}
      <form onSubmit={handlePost}>
      <FlexBetween ml="1rem" p="1rem 0rem" gap={"10px"}>
        <UserImage image={user.picturePath} />
        <FormControl
          sx={{ flexGrow: "1" }}
          onSubmit={() => {
            handlePost();
          }}
        >
          <TextField
            id="outlined-controlled"
            value={postData.description}
            onChange={(event) => {
              setPostData({ ...postData, description: event.target.value });
            }}
            placeholder="Whats on your mind?"
            sx={{ borderRadius: "20%", marginRight: "1rem" }}
          />
        </FormControl>
      </FlexBetween>

      <Divider />

      {/* DROPZONE TO ADD PICTURE*/}
      {isAttchment&&  
      <Box border={`2px solid black`} borderRadius="5px" p="0.8rem" m="1rem">
        
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => {
            console.log(acceptedFiles)
            return setPostData({ ...postData, picture: acceptedFiles[0] })
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Box {...getRootProps()} style={{ border: "2px dashed skyblue" }}>
              <input {...getInputProps()} />
              <Box display="flex" justifyContent="flex-start" pl="0.5rem">
                {postData.picture.path && (
                  <IconButton
                    onClick={() => {
                      if (postData.picture)
                        setPostData({ ...postData, picture: "" });
                    }}
                  >
                    <Clear />
                  </IconButton>
                )}
                {!postData.picture.path ? (
                  <p>Add Your Picture Here (currently only images are possible)</p>
                ) : (
                  <p style={{ paddingLeft: "10px" }}>{`${
                    postData.picture.path
                      ? postData.picture.name
                      : "Add Your Profile Picture"
                  }`}</p>
                )}
              </Box>
            </Box>
          )}
        </Dropzone>
        
      </Box>
      
      }

      <Divider />

      {/* THIRD ROW */}
      <FlexBetween margin="1rem 1rem 1rem 0.5rem"
       
      >
        <FlexBetween  >
          <IconButton onClick={()=>{handleClick()}}>
            <Image />
          </IconButton >
          <p style={{margin:"0"}}>Image</p>
        </FlexBetween>
        <FlexBetween>
          <IconButton onClick={()=>{handleClick()}}>
            <VideoFile />
          </IconButton>
          <p>Video</p>
        </FlexBetween>
        <FlexBetween>
          <IconButton onClick={()=>{handleClick()}}>
            <AttachFile />
          </IconButton>
          <p>Attachment</p>
        </FlexBetween>
        <FlexBetween>
          <IconButton onClick={()=>{handleClick()}}>
            <AudioFile />
          </IconButton>
          <p>Audio</p>
        </FlexBetween>
        <Button disabled={!postData.picture.path} type="submit" variant="contained"
                
                size={isNonMobileScreen?"medium":"small"}
        >
          Post
        </Button>
      </FlexBetween>
      </form>
    </WidgetWrapper>
  );
};

export default PostWidget;
