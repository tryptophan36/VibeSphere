import {Box,Typography} from "@mui/material"
import Friends from "../../Components/Friends"
import WidgetWrapper from "../../Components/WidgetWrapper"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { setFriends } from "../../state/index"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@emotion/react"

const FriendListWidget = ({userId}) =>{
    const {palette} = useTheme()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const token = useSelector((state)=>state.token)
    const friends = useSelector((state)=>state.user.friends)

    const getFriends = async () =>{
        const response = await fetch(
            `http://localhost:6001/user/${userId}/friends`,
            {
                method:"GET",
                headers : {Authorization : `Bearer ${token}`}
            }
        );
        const data = await response.json();
        dispatch(setFriends({friends:data.formattedFriends}))
        
      
    };
    useEffect(()=>{
        getFriends();
    },[])
    return (
        <WidgetWrapper mt={"1rem"} border="1px solid black">
            <Typography color={palette.neutral.dark} 
              variant="h5"
              fontWeight="500"
              sx={{p:"1rem"}}
            >
            Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="0rem">
             {
               Array.isArray(friends) && friends.map((friend)=>{
                const {firstName,lastName,location}=friend    
                const post = {firstName,lastName
                    ,userId:friend._id ,
                    location,userPicturePath:friend.picturePath}
                    
                    return(
                      <Friends post={post}/>
                    )
                })
             }
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget