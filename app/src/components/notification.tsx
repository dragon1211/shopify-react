import { Box, BoxProps, Text } from '@chakra-ui/layout'
import { FC, useState } from 'react'
import CloseIcon, {CloseIconBig} from './icons/closeIcon'
import React from 'react';
import ReactDOM from 'react-dom';

const Notification: FC<BoxProps> = (props) => {
    const [hide, setHide] = useState(false)
    const close = () => setHide(true)
    return (
        <>
        {!hide && 
            <>
                <Box {...props} display={{base:"none", md:"inherit"}} w="35px" px="10" textAlign="center" >
                    <Box ml="1px" cursor="pointer" onClick={() => close()}>
                        <CloseIcon />
                    </Box>
                    <Text mt="10px" variant="primary">
                        重要なお知らせ
                    </Text>
                    <Text>
                        ー
                    </Text>
                    <Text>
                        配達などに関するお知らせ
                    </Text>
                    <Text mt="5px" variant="primary">
                        ▶︎
                    </Text>
                </Box>
                <Box display={{base:"flex", md:"none"}} {...props} w="100%" align="center" mt="20px" >
                    <Box mr="15px" onClick={() => close()}>
                        <CloseIconBig />
                    </Box>
                    <Text variant="primary" mt="3px" mr="10px" fontSize="13px">
                        重要なお知らせ
                    </Text>
                    <Text>
                        |
                    </Text>
                    <Text ml="10px" fontSize="13px" mt="3px">
                        配達などに関するお知らせ
                    </Text>
                    <Text variant="primary" fontSize="17px" ml="10px">
                        ▶︎
                    </Text>
                </Box>
            </>
        }
        </>
    )
}

export default Notification