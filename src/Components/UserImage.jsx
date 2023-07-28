import { Box } from "@mui/material";

export const UserImage = ({image,size="60px"})=>{
return(
    <Box width={size} height={size}>
        <img 
         width={size}
         height={size}
        style={{
            objectFit:"cover",
            borderRadius:"50%"
        }}
        src={`http://localhost:6001/assets/${image}`} alt="" />
    </Box>
)

}

