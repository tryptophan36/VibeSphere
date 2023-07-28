import { Box } from "@mui/material";
import {styled} from "@mui/system"

const MessageWidget = styled(Box)(()=>({

    borderBottomLeftRadius:"18px",
    borderBottomRightRadius:"18px",
    borderTopLeftRadius:"18px",
    borderTopRightRadius:"18px",
    minWidth:"50px",
    maxWidth:"15rem",
    display:"inline-block",
    textAlign:"start",
    padding:"0.3rem 1rem"

})
)

export default MessageWidget;