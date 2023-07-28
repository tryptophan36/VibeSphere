import { Box } from "@mui/material";
import {styled} from "@mui/system";

//creating a reuseable css component
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent : "space-between",
    alignItems:"center",
    
})

export default FlexBetween;