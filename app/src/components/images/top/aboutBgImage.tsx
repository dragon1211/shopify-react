import React from 'react'
import { 
    Box,
    BoxProps,
  } from "@chakra-ui/react"
import ReactDOM from 'react-dom';

interface Props extends BoxProps {
}
const AboutBgImage = (props: Props) => (
    <>
    <Box {...props} display={{base:"none", md: "block"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
            <g id="about_pattern" transform="translate(-760 -820.337)">
                <path id="Path_3161" data-name="Path 3161" d="M1000,1060.337v240h240v-240Zm119.93,190.995c-38.545,0-69.792-31.635-69.792-70.658s31.247-70.659,69.792-70.659,69.792,31.635,69.792,70.659S1158.475,1251.332,1119.93,1251.332Z" fill="#42b04d"/>
                <path id="Path_3162" data-name="Path 3162" d="M1000,940.337a120,120,0,0,0,120,120v-240A120,120,0,0,0,1000,940.337Zm120,0a120,120,0,0,0,120,120v-240A120,120,0,0,0,1120,940.337Z" fill="#f5d85e"/>
                <path id="Path_3163" data-name="Path 3163" d="M760,940.133l119.8-119.8H760Zm0,120.2H879.8L760,940.537ZM880.2,820.341l119.8,119.8v-119.8Zm119.8,240v-119.8l-119.8,119.8Z" fill="#eb6860"/>
            </g>
        </svg>
    </Box>
    <Box {...props} display={{base:"block", md: "none"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="276" height="276" viewBox="0 0 276 276">
            <g id="aboutパターン" transform="translate(-98.679 -878.596)">
                <path id="Path_3164" data-name="Path 3164" d="M236.679,1016.6v138h138v-138Zm68.96,109.822c-22.164,0-40.131-18.19-40.131-40.629s17.967-40.628,40.131-40.628,40.13,18.19,40.13,40.628S327.8,1126.418,305.639,1126.418Z" fill="#42b04d"/>
                <path id="Path_3165" data-name="Path 3165" d="M236.679,947.6a69,69,0,0,0,69,69v-138A69,69,0,0,0,236.679,947.6Zm69,0a69,69,0,0,0,69,69v-138A69,69,0,0,0,305.679,947.6Z" fill="#f5d85e"/>
                <path id="Path_3166" data-name="Path 3166" d="M98.679,947.478,167.563,878.6H98.679Zm0,69.115h68.884L98.679,947.711ZM167.795,878.6l68.884,68.882V878.6Zm68.884,138V947.713L167.795,1016.6Z" fill="#eb6860"/>
            </g>
        </svg>

    </Box>
    </>
)

export default AboutBgImage
