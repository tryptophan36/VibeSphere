import { useEffect, useState } from "react";
import Logo from "../../assets/VSLogo.gif";
import './styles.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../Components/FlexBetween";
import { setLogin } from "../../state/index";
import { Box,
        useTheme,
        useMediaQuery,
        Typography,
        Container,
        FormControl,
        Link,
        TextField,
        Button
} from "@mui/material";
import {Form} from '../../Components/Form'
const LoginPage = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //theme settings
  //theme settings
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const isNonMobileScreen = useMediaQuery("(min-width : 1000px)");
  const isMobileScreen = useMediaQuery("(max-width: 600px)")
  const maxwidth = isNonMobileScreen?"50%":"undefined"
    return (
        <>
        <nav>
        <Box display="flex" justifyContent="center" alignItems="center" 
        margin={"0rem"}
        padding={"1rem 0 0.5rem 0 "}
        backgroundColor={alt} 
        >
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
            sx={{
              "&:hover": {
                color: "#8fb1c2",
                cursor: "pointer",
              },
            }}
          >
            VibeSphere
          </Typography>
        </Box>
        </nav>
            <Container
            maxWidth={isNonMobileScreen?"sm":(isMobileScreen?"xs":"sm")}
             sx={{
                width:`${maxwidth}`,
                backgroundColor:alt,
                marginTop:"1.5rem!important",
                border:"1px solid black",
             borderRadius:"0.5rem",
             paddingTop:"1.5rem"
            }}
            >
            <Form/>
            </Container>
        
        </>
    )
}
export default LoginPage;