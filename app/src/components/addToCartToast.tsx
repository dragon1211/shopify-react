import React, { FC, useEffect, useState } from 'react'
import {
  Flex,
  Button,
  Box,
  useToast,
  Image,
  Text,
  IconButton,
  Divider
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";


interface Props {
    product: any;
    cartItemQty: number;
}

const AddToCartToast:FC<Props> = ({product, cartItemQty}) =>  {
    const toast = useToast();
    const imageWidth = "57px";
    const imageHeight = "41px";
    const toastPaddingX = 20;
    const toastPaddingY = `${toastPaddingX / 2}px`;
    const primary = "#EB6860";
    console.log(product);
    
    return (
        <Box
            bg="white"
            px={`${toastPaddingX}px`}
            py={toastPaddingY}
            borderRadius={"5px"}
            boxShadow="0 0 2px 2px #efdfde"
            w={{ base: `calc(100vw - ${toastPaddingX / 1.3}px)`, md: "400px" }}
            pos="relative"
        >
            <Text>
                カートに追加済み
            </Text>
            <Box
                as="button"
                onClick={() => toast.closeAll()}
                pos="absolute"
                right="1em"
                top="0.5em"
                _hover={{
                    opacity:.5
                }}
            >
                <CloseIcon color={primary} />
            </Box>
            <Divider mt="10px" mb="20px" />
            <Flex pos="relative">
                <Image
                    w={imageWidth}
                    h={imageHeight}
                    src="https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_1080x.png?v=1636357415"
                />
                <Box
                    py="0"
                    px="10px"
                    verticalAlign="start"
                    w={`calc(100% - ${imageWidth})`}
                >
                <Text variant='primary' as="h3">
                    {product.product_title}
                </Text>
                {product.options_with_values.map((o, i) => (
                    <Text key={i} fontSize={"14px"}>
                        {
                            o.value !== "Default Title" &&
                            <>
                                {o.name}：{o.value}
                            </>
                        }
                    </Text>
                ))}
                {product.selling_plan_allocation && <Text fontSize={"14px"}>
                    お届け間隔：{product.selling_plan_allocation.selling_plan.name}
                </Text>}
                <Text pos="absolute" right="0em" top="0em">
                    数量：{product.quantity}
                </Text>
                </Box>
            </Flex>
            <Button variant="accentBordered" mt="10px" w="100%" as="a" href="/cart">カートを見る ({cartItemQty})</Button>
            <Button variant="accent" w="100%" onClick={() => toast.closeAll()}>買い物を続ける</Button>
        </Box>
    )
}

export default AddToCartToast
