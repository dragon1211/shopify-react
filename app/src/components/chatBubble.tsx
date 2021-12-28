import React, {FC} from 'react'
import { 
    Box,
    BoxProps,
  } from "@chakra-ui/react"
  import ReactDOM from 'react-dom';

interface Props {
    boxProps?: BoxProps
}

const ChatBubble:FC<Props> = ({boxProps, children}) => {

    return (
        <Box
            position="relative"
            w="100%"
            bg="#F0F0F0"
            borderRadius="3em"
            px={{base: "30px", md: "120px"}}
            py="80px"
            _after={{
                content:'" "',
                position:"absolute",
                left:{base:"60px", md: "145px"},
                top:"-40px",
                borderLeft:"30px solid transparent",
                borderRight:"30px solid transparent",
                borderBottom:"60px solid #F0F0F0",
            }}
            {...boxProps}
            >
            {children}
        </Box>
    )
}

export default ChatBubble
