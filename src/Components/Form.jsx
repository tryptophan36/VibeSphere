import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  IconButton,
  Link,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/index";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  occupation: "",
  picture: "",
  location: "",
};

const initialValueLogin = {
  email: "",
  password: "",
};

export const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
   
  // On registering
  const register = async (values,onsubmitProps)=>{
      //allows us to send form data with image
      const formData = new FormData()
      for(let value in values){
         formData.append(value,values[value])
      }
      formData.append("picturePath",values.picture.name)
      
      const savedUserResponse = await fetch(
        "http://localhost:6001/auth/register",
        {
            method : "POST",
            body : formData,
        }
      )
      const savedUser = await savedUserResponse.json();
      onsubmitProps.resetForm()
      if(savedUser)
      {
        setPageType("login")
      }
   }

   //On login
   const login= async (values,onSubmitProps) =>{
    const loggedInResponse = await fetch(
        "http://localhost:6001/auth/login",
        {
            method:"POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify(values),
        }
    )
    const loggedIn = await loggedInResponse.json()
    
    if(loggedIn){
        dispatch(
            setLogin({
                user: loggedIn.user,
                token:loggedIn.token
            })//payload
        )
        navigate("/home")
    }

   }
     //Form for registration and Login
  const handleFormsumbit = async (values, onsubmitProps) => {
    if(isLogin) await login(values,onsubmitProps)
    if(isRegister) await register(values,onsubmitProps)
  };

  return (
    <Formik
      onSubmit={handleFormsumbit}
      initialValues={isLogin ? initialValueLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              "&>div": { gridColumn: isNonMobile ? undefined : "span 4" }, //when mobile view
              //one div will take 4 columns
            }}
          >
            {isRegister && (
              <>
                <Typography variant="h6" sx={{ gridColumn: "span 4" }}>
                  Welcome To VibeSphere ! The Social Media To Vibe The Era
                </Typography>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                  size="small"
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                  size="small"
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                  size="small"
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                  size="small"
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid blue`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      return setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        style={{ border: "2px dashed black" }}
                      >
                        <input {...getInputProps()} />
                        <Box display="flex" justifyContent="flex-start">
                          {values.picture && (
                            <IconButton
                              onClick={() => {
                                if (values.picture)
                                  setFieldValue("picture", "");
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          )}
                          {!values ? (
                            <p>Add Your Profile Picture</p>
                          ) : (
                            <p style={{ paddingLeft: "10px" }}>{`${
                              values.picture
                                ? values.picture.name
                                : "Add Your Profile Picture"
                            }`}</p>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                  size="small"
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                  size="small"
                />

                <Button
                  variant="contained"
                  type="Submit"
                  sx={{ gridColumn: "span 4", marginBottom: "0rem" }}
                >
                  {isLogin ? `Login` : "Register"}
                </Button>

                <Link
                  sx={{
                    gridColumn: "span 4",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  marginBottom="1rem"
                  onClick={() => {
                    setPageType(isLogin?"register":"login")
                    resetForm();
                }}
                >
                  <Typography variant="h6">
                    {isLogin?"Dont Have An Account ? Register ":
                    
                    'Already Have An Account ? Login Here !'}
                  </Typography>
                </Link>
          </Box>
        </form>
      )}
    </Formik>
  );
};
