import React from 'react'
import { 
    Box,
    BoxProps,

} from "@chakra-ui/react"

function TriangleRightIcon(props: BoxProps) {
    const {color} = props

    return (
        <Box {...props}>
            <svg width="10.253" height="12" viewBox="0 0 10.253 12">
                <path id="Path_3216" data-name="Path 3216" d="M1522.959,470.371l8.45,5.087a.9.9,0,0,1,0,1.544l-8.45,5.107a.9.9,0,0,1-1.368-.771V471.144A.9.9,0,0,1,1522.959,470.371Z" transform="translate(-1521.593 -470.241)" fill={(color || 'white') as string}/>
            </svg>
        </Box>

    )
}

export default TriangleRightIcon
