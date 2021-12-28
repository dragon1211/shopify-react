import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { useBreakpointValue } from '@chakra-ui/media-query'
import React, { FC } from 'react'
import {render} from 'react-dom'
interface Props {
    type: "obento" | "osouzai"
}

const KodawariButton: FC<Props> = ({type}) => {
    
    const images =  {
        obento: useBreakpointValue({base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/kodawariBentoSp.png", md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/kodawariBentoPc.png"}),
        osouzai: useBreakpointValue({base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/kodawariBentoSp.png", md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/kodawariOsouzaiPc.png"}),
    }
    const src = images[type]
    return (
        <>
        {src 
            && 
            <Box as={'a'} href="">
                <Image
                    width="100%"
                    alt={src} 
                    fallbackSrc={src} 
                    src={src} 
                />
            </Box>
            }
        </>
    )
}

export default KodawariButton
