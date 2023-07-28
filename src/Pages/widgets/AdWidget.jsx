import React from 'react'
import {Typography,useTheme} from "@mui/material"
import FlexBetween from '../../Components/FlexBetween'
import WidgetWrapper from '../../Components/WidgetWrapper'


const AdWidget = () => {
    const {palette} =useTheme();
    const dark = palette.neutral.main;
    const main = palette.neutral.main;
    const medium =palette.neutral.medium
  
    return (
     <WidgetWrapper marginTop=" 2rem" border={"1px solid black"}>
        <FlexBetween flexDirection="column">
            <Typography color={dark} variant="h5" fontWeight="500">
             Sponsered
            </Typography>
            <Typography color={medium}>
             Create Ad
            </Typography>
            <img 
            width="90%"
            height="auto"
            src="http://localhost:6001/assets/info4.jpeg" 
            alt="advert"
            style={{
                borderRadius : "0.75rem", margin:"0.75rem 0"
            }} />
            <FlexBetween flexDirection="column">
                <Typography color={main}>
                    Mkia Cosmetics
                </Typography>
                <Typography color={medium}> MikaCosmetics.com </Typography>
                <Typography color={medium} m="0.5rem 0.5rem">
                    Your pathway to stunning and immaculate beauty and made sure 
                    your skin is exfoliationg and shining like light.
                </Typography>
            </FlexBetween>
        </FlexBetween>
     </WidgetWrapper>
  )
}

export default AdWidget