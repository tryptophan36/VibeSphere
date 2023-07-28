import React, { useEffect, useState } from "react";
import WidgetWrapper from "../../Components/WidgetWrapper";
import FlexBetween from "../../Components/FlexBetween";
import { UserImage } from "../../Components/UserImage";
import { Box, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {} from "../../state/index";
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { Person2, FmdGood, Work, Twitter, LinkedIn,Edit } from "@mui/icons-material";

const UserWidget = ({ userId }) => {
  const [user,setUser] = useState(null)
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
   
  //making Api call to get user
  const getUser = async () => {
    const response = await fetch(`http://localhost:6001/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data.user)
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) {
    return null;
  }
  return (
    <WidgetWrapper  marginTop="2rem" border="1px solid black">
      {/* First Row */}
      <FlexBetween pb={"1.1rem"}>
        <FlexBetween gap={"0.5rem"} padding={"1rem 0 0 1rem"}>
          <UserImage image={user.picturePath} />
          <Box marginLeft="0.4rem">
            <Typography
              sx={{
                textTransform: "capitalize",
                marginTop: "0.4rem",
                "&:hover": { cursor: "pointer", color: "gray" },
              }}
              onClick={() => {
                navigate(`/profile/${user._id}`);
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <p style={{ marginTop: "0rem", fontSize: "0.8rem", color: "grey" }}>
              {user.friends.length} Friends
            </p>
          </Box>
        </FlexBetween>
        <Person2 sx={{ marginRight: "1rem" }}></Person2>
      </FlexBetween>
      <Divider />
     
      {/* Second Row */}
      <Box
        display="flex"
        justifyContent="flex-start"
        gap="1.5rem"
        p="1rem 0 0 1.5rem"
      >
        <FmdGood />
        <Typography variant="h6" color="gray">
          {user.location}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        gap="1.5rem"
        p="1rem 0 1rem 1.5rem"
      >
        <Work />
        <Typography variant="h6" color="gray">
          {user.occupation}
        </Typography>
      </Box>
      <Divider />

      {/*Third Row*/}
      <FlexBetween p="1rem 0 0 1rem">
        <Typography variant="h6" color={"gray"}>
          who's viewed your profile
        </Typography>
        <Typography variant="h6" pr={"1rem"}>
          {user.viewedProfile}
        </Typography>
      </FlexBetween>
      <FlexBetween p="1rem 0 0.5rem 1rem">
        <Typography variant="h6" color={"gray"}>
          impressions on your post
        </Typography>
        <Typography variant="h6" pr={"1rem"}>
          {user.impressions}
        </Typography>
      </FlexBetween>
      <Divider />

      {/*Fourth Row*/}
      <FlexBetween p="0 0 0 1rem">
        <FlexBetween gap="0.5rem">
          <Twitter fontSize="large" />
          <Box>
            <Typography m="1rem 0 0 0rem" variant="h6">
              Twitter
            </Typography>
            <p style={{ marginTop: "0", fontSize: "0.8rem", color: "gray" }}>
              Social Network
            </p>
          </Box>
        </FlexBetween>
        <Edit sx={{ marginRight: "1rem" }}/>
      </FlexBetween>
      <FlexBetween pl="1rem">
        <FlexBetween gap="0.5rem">
          <LinkedIn fontSize="large" />
          <Box>
            <Typography m="1rem 0 0 0rem" variant="h6">
              LinkedIn
            </Typography>
            <p style={{ marginTop: "0", fontSize: "0.8rem", color: "gray" }}>
              Social Network
            </p>
          </Box>
        </FlexBetween>
        <Edit sx={{ marginRight: "1rem" }}/>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserWidget;
