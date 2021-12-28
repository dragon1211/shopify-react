import React, { useEffect, useState } from "react";
import { 
  Box,
  ChakraProvider, 
  Flex, 
  Select, 
  Image,
  Text,
  HStack,
  VStack,
  useBreakpointValue
} from "@chakra-ui/react"
import { EntryPoint } from "../../components/EntryPoint";
import{PageLayout}from "../../components/layout";
import theme from "../../styles/theme";
import ProductImage from "../../components/productImage";
import currency from 'currency.js'
/**
 * @desc THE MAIN PAGE
 */
const Content = () => {
  const [tags, setTags]= useState([])
  const [options, setOptions]= useState([])
  const [data, setData]= useState([])
  const [sortVal, setSortVal]= useState('')
  const [filterVal, setFilterVal]= useState('')
  const url = new URL(window.location.href)
  const JPY = value => currency(value, { precision: 0, symbol: '¥' });

  useEffect(() => {
    setOptions((window as any).sortOptions)
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setSortVal(params.sort_by)
    setFilterVal(decodeURI(url.pathname.replace('/collections/all/', '')))
    const products = (window as any).products
    setData(products)
    setTags((window as any).tags)
  },[sortVal, filterVal])

  const filterHandler = (evt) => {    
    window.location.href = evt.target.value === 'all' ? `/collections/all${url.search}` : `/collections/all/${evt.target.value}${url.search}`
  }
  return (
    <>
      <Flex borderTop="solid 1px #F0F0F0" borderBottom="solid 1px #F0F0F0" py="16px" flexWrap="wrap" alignItems="center" mb={{base:"50px", md:"40px"}}>
        <HStack w={{base:"100%", md:"300px"}} mb={{base:"16px", md:"0px"}} pr={{base:"0px", md:"20px"}}>
          <Text variant="primary" mr="auto" w="110px">
            絞り込み方法
          </Text>
          <Select value={filterVal} justifySelf="end" w="200px" onChange={(evt) => filterHandler(evt)}>
            <option value="all">全ての商品</option>
            {tags.map((t,i) => <option key={i} value={t}>{t}</option>)}
          </Select>
        </HStack>
        <HStack w={{base:"100%", md:"auto"}}>
          <Text variant="primary" mr="auto">
            並び替え
          </Text>
          <Select w="200px" value={sortVal} onChange={(evt) => window.location.href = `?sort_by=${evt.target.value}`} >
            {options.map((o,i) => <option key={i} value={o[0]}>{o[1]}</option>)}
          </Select>
        </HStack>
      </Flex>
      <Flex flexWrap="wrap" w={{base:"100%"}}>
        {data.map((d,i) => 
          <Box 
            as={'a'}
            href={`/products/${d.handle}`}
            w={{base:"315px", md:"440px"}}
            mr={{base:"0", md: i % 2 === 0 ? "80px" : "0px" }}
            mb={{base:"80px", md:"98px"}}
            key={i}
            >
            <ProductImage src={d.featured_image}/>
            <Text fontSize="22px" letterSpacing="0.12em" mt={{base:"17px", md:"25px"}}>{d.title}</Text>
            <Text fontSize={{base:"18px", md:"20px"}} letterSpacing="0.12em" mt="12px">{JPY(d.price / 100).format()} (税込）</Text>
          </Box>)}
      </Flex>
    </>
  );
}



/**
 * @desc THE MAIN PAGE
 */
const Index = () => { 
  const crumbs = [
    {name:'トップ', href:'/'},
    {name:'商品一覧', href:'/collections/all'},
  ]
  return (
    <PageLayout crumbs={crumbs} title="商品一覧" >
      <Content />
    </PageLayout>
  )
}

EntryPoint(
  <ChakraProvider theme={theme}>
    <Index />
  </ChakraProvider>
);