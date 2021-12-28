import { Box, BoxProps} from '@chakra-ui/layout'
import React from 'react'

interface Props extends BoxProps{
    color: any, 
    progressvalue: any
}

function ProgressBar(props: Props) {
    const { color, progressvalue } = props;
    delete props.color
    delete props.progressvalue
    return (
        <Box {...props} height="10px" width="100%" bg="#e0e0de" borderRadius="full">
            <Box transition='width .5s ease-in-out' height="100%" width={`${progressvalue}%`} bg={color} borderRadius="inherit" />
        </Box>
    )
}

export default ProgressBar
