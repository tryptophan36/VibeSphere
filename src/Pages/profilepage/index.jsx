import { Box,useMediaQuery } from "@mui/material";
import { useEffect,useState } from "react";
import UserWidget from "../widgets/UserWidget";
import DisplayPostWidget from "../widgets/DisplayPostWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import PostWidget from "../widgets/PostWidget";
import Navbar from "../navbar/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ProfilePage = ()=>{
     const [user,setUser] = useState(null)
     const {userId} = useParams()
     const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
     const token = useSelector((state)=>state.token)
     
     const getUser = async ()=>{
        const response = await fetch(`http://localhost:6001/user/${userId}`,{
            method:"GET",
            headers:{Authorization :`Bearer ${token}`}
        })
        const data= response.json()
        setUser(data)

     }
     useEffect(()=>{
        getUser()
     },[])

    if(!user) return null;
    
    return (
        <div>
            <Navbar></Navbar>
            <Box 
             width="100%"
             padding="2rem 6%"
             display={isNonMobileScreen?"flex":"block"}
             gap="0.5 rem"
             justifyContent={"space-between"}
            >
                <Box flexBasis={isNonMobileScreen?"26%":"undefined"}>
            <UserWidget userId={userId}/>
            </Box>
            <Box 
              flexBasis={isNonMobileScreen?"42%":"undefined"}
            >
                
                <DisplayPostWidget userId={userId}/>
            </Box >
            <Box flexBasis={isNonMobileScreen?"26%":"undefined"}>
             <FriendListWidget userId={userId}/>
            </Box>
             
            </Box>
        </div>
    )
}
export default ProfilePage;