import React, { FC, useEffect, useState } from "react";
import { 
  Box,
  ChakraProvider, 
  Flex, 
  Divider, 
  Image,
  Text,
  HStack,
  Button,
  VStack,
  useBreakpointValue,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  Input,
} from "@chakra-ui/react"
import { EntryPoint } from "../../components/EntryPoint";
import{Layout, PageLayout}from "../../components/layout";
import theme from "../../styles/theme";
import ProductImage from "../../components/productImage";
import currency from 'currency.js'
import { getGraphqlClient } from "../../utils/gqlClient";
import { gql } from "@apollo/client";
import PrimaryButton from "../../components/primaryButton";
import KodawariButton from "../../components/kodawariButton";
import CRender from "../../components/cRender";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BackButton from "../../components/backButton";

/**
 * @desc THE PRODUCT DETAIL COMPONENT
 */
interface ProductDetailsProps {
  data: any[]
}
 const ProductDetails:FC<ProductDetailsProps> = ({data}) => {
  return (
    <Box>
      {data.map((d,i) => 
        <Accordion key={i} defaultIndex={[0]} allowMultiple mt="40px">
          <AccordionItem>
            <h2>
              <AccordionButton bg="#F0F0F0" h={{base:"48px", md:"54px"}}>
                <Box flex="1" textAlign="left">
                  {d.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={{base: "18px", md:"35px"}} border="1px solid #D3D3D3">
              <CRender json={d.content.json} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  )
 }

/**
 * @desc THE MAIN PAGE
 */
const Content = () => {
  const [featureImage, setFeatureImage]= useState('')
  const [productDetails, setProductDetails]= useState([])
  const [currentVariant, setCurrentVariant]= useState()
  const [currentCard, setCurrentCard]= useState('')
  const [sortVal, setSortVal]= useState('')
  const [currentSetPlan, setCurrentSetPlan]= useState('')
  const [product, setProduct]= useState(null)
  const [filterVal, setFilterVal]= useState('')
  const [selling_plan_groups, setSellingPlanGroups] = useState<any>([])
  const [quantity, setQuantity] = useState<number>(0)
  const url = new URL(window.location.href)
  const pageHandle = decodeURI(url.pathname.replace('/products/', ''))
  const [isSubscription, setIsSubscription] = useState<any>([])
  const [selling_plan, setSellingPlan] = useState<string>('')
  const JPY = value => currency(value, { precision: 0, symbol: '¥' });
  const thumbnailSize = useBreakpointValue({base:"71px", md:"99px"})
  const isMobile = useBreakpointValue({base:true, md:false})
  const calcThumbnailMargin = (margin: string, i: number) => i > 0 && i % 3 === 0 ? "0px" : margin
  useEffect(() => {
    (async () => {
      const { data } = await getGraphqlClient.query({
          query: gql`
              query {
                productDetailCollection(where: {handle: "${pageHandle}"}) {
                  items {
                    handle
                    title
                    content {
                      json
                    }
                  }
                }
              }
          `,
      });
      setProductDetails(data.productDetailCollection.items)
    })()
    const p = (window as any).product
    localStorage.setItem('product', JSON.stringify(p))
    setProduct(p)
    setSellingPlanGroups(p.handle !== 'gift' ?   p.selling_plan_groups[0].selling_plans : [])
    setFeatureImage(p.featured_image)
  },[])
  const setCurrentDonutFlavor = (variantId) => {
    setCurrentVariant(
      product.variants.find(v => {
        return v.id === parseInt(variantId)
      })
    )
  }
  return (
    <>
      {
        product 
          ? <>
            <Flex flexWrap="wrap" w={{base:"100%"}}>
              <Box mb={{base:"40px", md:"0px"}}>
                <ProductImage noHover={true} src={featureImage}/>
                <Flex w={{base: "315px", md:"440px"}}  flexWrap="wrap">
                  {product.media.map((p:any,i:number) => 
                    <Box 
                      key={i} 
                      mt="20px"
                      mr={{base: calcThumbnailMargin("10px", i), md: calcThumbnailMargin("14px", i) }}
                      h={thumbnailSize} 
                      w={thumbnailSize}
                      onClick={() => setFeatureImage(p.src)}
                      cursor="pointer"
                      overflow="hidden"
                      transition="all .7s"
                      _hover={{
                        '&>img' :{
                          transform: 'scale(1.1)'
                        }
                      }}>
                      <Image fallbackSrc={p.src} alt={p.src} src={p.src} h="100%" w="100%" transition="all 0.3s"/>
                    </Box>
                  )}
                </Flex>
              </Box>
              <Box ml={{base: "0px", md: "80px"}} w={{base: "315px", md:"440px"}}>
                <Text variant="pageTitle" pb={{base:"9px", md:"20px"}}>
                  {product.title}     
                </Text>
                {
                  isMobile 
                    ? <>
                        <Text fontSize="16px" letterSpacing="0.075em" mb="26px">{JPY(currentVariant ? (currentVariant as any).price  / 100 :  product.price / 100).format()} (税込）</Text>
                        <Text fontSize="16px" letterSpacing="0.075em" dangerouslySetInnerHTML={{__html: product.description}}></Text>
                      </>
                    : <>
                        <Text fontSize="16px" letterSpacing="0.075em" mb="30px"dangerouslySetInnerHTML={{__html: product.description}}></Text>
                        <Text fontSize="16px" letterSpacing="0.075em">{JPY(currentVariant ? (currentVariant as any).price  / 100 :  product.price / 100).format()} (税込）</Text>
                      </>
                }
                
                {
                     product.handle !== "obento" && pageHandle !== "gift" &&
                     <>
                          <Flex mt="22px" direction={{base:"column", md:"row"}}>
                              <Box 
                                  width= {{base:"100%",md:"auto"}}
                                  h={{base:"78px", md: "auto"}}
                                  onClick={() => {
                                      setIsSubscription(false)
                                      setSellingPlan('')
                                  }}
                                  bg={!isSubscription? "#EB6860" : "white" }　cursor="pointer"
                                  mr={{base:0, md:"16px"}}
                                  color={!isSubscription? "white" : "#707070" } fontSize={{base:"18px"}}
                                  px={{base:"14px", md: "28px"}}
                                  py="14px"
                                  borderRadius="10px"
                                  border={!isSubscription ? "solid 1px #EB6860" :"solid 1px #707070"}
                              >
                                  都度購入
                                  <Text color={!isSubscription? "white" : "#707070" } fontSize="14px" display={{base:"inherit",md:"none"}}>
                                      お試しで買ってみたい方にオススメ
                                  </Text>
                              </Box>
                              <Box 
                                  mt={{base:"20px", md:"auto"}}
                                  h={{base:"78px", md: "auto"}}
                                  onClick={() => setIsSubscription(true)} bg={isSubscription? "#EB6860" : "white" }　cursor="pointer"
                                  width= {{base:"100%",md:"auto"}}
                                  px={{base:"14px", md: "28px"}}
                                  py="14px"
                                  borderRadius="10px"
                                  color={isSubscription? "white" : "#707070" } fontSize={{base:"18px"}}
                                  border={isSubscription ? "solid 1px #EB6860" :"solid 1px #707070"}
                              >
                                  定期購入
                                  <Text color={isSubscription? "white" : "#707070" } fontSize="14px" display={{base:"inherit",md:"none"}}>
                                      ずっとオトクに購入できます
                                  </Text>
                              </Box>
                          </Flex>             
                        {
                          isSubscription &&
                          <Select placeholder="お届け間隔をお選びください" justifySelf="end" maxW="302px" onChange={(evt) => setSellingPlan(evt.target.value)} w="100%" mt="30px">
                              {selling_plan_groups.map((t,i) => <option key={i} value={t.id}>{t.name}</option>)}
                          </Select>
                        }
                        {
                          pageHandle === "donut" && 
                          <Select placeholder="味を選んでください" justifySelf="end" maxW="302px" onChange={(evt) => setCurrentDonutFlavor(evt.target.value)} w="100%" mt="30px">
                            {product.variants.map((t,i) => <option key={i} value={t.id}>{t.title}</option>)}
                          </Select>
                        }
                        {
                          pageHandle !== "gift" &&
                           <Input placeholder="個数を入力してください" maxW="302px" onChange={(evt) => setQuantity(parseInt(evt.target.value))} type="number" mt="30px" />
                        }
                     </>
                }
                {
                  pageHandle === "gift" && 
                  <>
                    <Select placeholder="メッセージカードをお選びください" justifySelf="end" maxW="302px" onChange={(evt) => setCurrentCard(evt.target.value)} w="100%" mt="30px">
                      {product.variants.map((t,i) => <option key={i} value={t.id}>{t.option3}</option>)}
                    </Select>
                    <Select placeholder="プランを選択してください" justifySelf="end" maxW="302px" onChange={(evt) => setCurrentSetPlan(evt.target.value)} w="100%" mt="30px">
                      {product.variants.map((t,i) => <option key={i} value={t.id}>{t.option1}</option>)}
                    </Select>

                  </>
                }
                {
                  product.handle !== "gift" ?
                  <>
                    { 
                      product.handle === "obento"
                        ? <PrimaryButton buttonProps={{height:"54px", mb:"57px", mt:"35px", fontSize:"15px", minW:"250px", w:{base: "100%", md: "fit-content"}}} title={product.handle === "obento" ? "プランとメニューを選んで購入" : "購入する"} href="/pages/choosing-plan" />
                        : <PrimaryButton disabled={!quantity || (isSubscription && !selling_plan || (product.handle === "donut" && !currentVariant) )} buttonProps={{height:"54px", mb:"57px", mt:"35px", fontSize:"15px", minW:"250px", w:{base: "100%", md: "fit-content"}}} title="購入する" rightIcon="cart" />
                    }
                  </>
                  : <PrimaryButton disabled={!currentCard || !currentSetPlan} buttonProps={{height:"54px", mb:"57px", mt:"35px", fontSize:"15px", minW:"250px", w:{base: "100%", md: "fit-content"}}} title="購入する"  rightIcon="cart" />
                }
                <Divider orientation="horizontal" mb="40px" />
                <KodawariButton type={product.handle} />
                <ProductDetails  data={productDetails} />
              </Box>
            </Flex>
          </>
          : 'no product data'
      }
    </>
  );
}



/**
 * @desc THE MAIN PAGE
 */
const Index = () => { 
  return (
    <Layout>
      <Container maxW={'7xl'} 
          pt={{md:"140px", base:"140px"}}
          pb={{md:"140px", base:"0"}}
          px="30px"
      >
          <VStack>
              <Box w="100%" maxW={{base:"100%", md:"960px"}}>
                <BackButton />
                <Content />
              </Box>
          </VStack>
      </Container>
    </Layout>
  )
}
export default Index

EntryPoint(
  <ChakraProvider theme={theme}>
    <Index />
  </ChakraProvider>
);