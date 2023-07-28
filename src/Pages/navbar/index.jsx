import { useState } from "react";
import Logo from "../../assets/VSLogo.gif";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Chat
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../Components/FlexBetween";
import { setMode, setLogout,openChat } from "../../state/index";
import TemporaryDrawer from "./TemporaryDrawer";


const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const chatMode = useSelector((state)=>state.chatMode)

  //theme settings
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const isNonMobileScreen = useMediaQuery("(min-width : 1000px)");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fullName = user ? `${user.firstName} ${user.lastName}` : "jhon wick";
  const openChatMode = (state)=>{
    const data= {mode:state,sender:"",reciever:""}
    dispatch(openChat({chatMode:data}))
    //console.log(chatMode.mode)
  }
  return (
    <nav >
      <FlexBetween
        padding="1 rem 6%"
        backgroundColor={alt}
        paddingTop={"0.5rem"}
      >
        <FlexBetween padding={"0 24px "}>
          <img
            src={Logo}
            alt=""
            style={{ width: "60px", borderRadius: "60%" }}
          />
          <Typography
            fontWeight={"bold"}
            fontSize="clamp(1rem,2rem,2.25rem)"
            marginLeft={"0.5rem"}
            color="primary"
            onClick={() => {
              openChatMode(false)
              navigate("/home");
            }}
            sx={{
              "&:hover": {
                color: "#8fb1c2",
                cursor: "pointer",
              },
            }}
          >
            VibeSphere
          </Typography>
          {isNonMobileScreen && (
            <FlexBetween
              marginLeft={"0.5rem"}
              padding={"0.1rem 1.5rem"}
              gap="3rem"
              borderRadius="9px"
              backgroundColor={neutralLight}
            >
              <InputBase placeholder="search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {isNonMobileScreen ? (
          <FlexBetween gap={"2rem"} paddingRight={"24px"}>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton 
              onClick={()=>{
                openChatMode(true)
                navigate('/chatPage')
              }
              }>
              <Message fontSize="24px" />
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton>
            <IconButton>
              <Help />
            </IconButton>
            <FormControl variant="standard">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                }}
              >
                <MenuItem value={fullName}>
                  <Typography textTransform={"capitalize"}>
                    {fullName}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/")
                    
                  }}
                >
                  <Typography>Logout</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <>
          <TemporaryDrawer/>
          </>
        )}
      </FlexBetween>
    </nav>
  );
};
export default Navbar;
