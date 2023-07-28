import Navbar from "../navbar/index";
import UserWidget from "../widgets/UserWidget";
import { Container, useMediaQuery,Box } from "@mui/material";
import { useSelector } from "react-redux";
import PostWidget from "../widgets/PostWidget"
import DisplayPostWidget from "../widgets/DisplayPostWidget"
import AdWidget from "../widgets/AdWidget";
import FriendListWidget from "../../Pages/widgets/FriendListWidget";
const HomePage = ()=>{
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
    const userId = useSelector((state)=>state.user._id)
    
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
                <PostWidget userId={userId}/>
                <DisplayPostWidget></DisplayPostWidget>
            </Box >
            <Box flexBasis={isNonMobileScreen?"26%":"undefined"}>
             <AdWidget/>
             <FriendListWidget userId={userId}/>
            </Box>
             
            </Box>
        </div>
    )
}
export default HomePage;