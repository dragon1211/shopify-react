import { 
    Box,
    Text,
    Image,
    BoxProps,
} from '@chakra-ui/react';
import React, { FC } from 'react'
import { render } from "react-dom";

interface Props {
  src: string;
  noHover?: boolean;
}

const ProductImage: FC<Props> = ({src, noHover}) => {
  
  return (
      <Box 
        transition="all .7s"
        _hover={!noHover && {
          '&>img' :{
            transform: 'scale(1.1)'
          }
        }}
        w={{base:"315px", md:"440px"}}
        h={{base:"255px", md:"356px"}}
        borderTopRightRadius={{base:"53.9px", md:"55px"}}
        overflow="hidden"
      >
        <Image
          w="100%"
          h="100%"
          src={src}
          fallbackSrc={src}
          alt={src}
          transition="all 0.3s"
        />
      </Box>
  )
}
export default ProductImage
