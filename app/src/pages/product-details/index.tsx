import React, { FC, useEffect, useState } from "react";
import { 
  Box,
  ChakraProvider, 
  Flex, 
  Divider, 
  Image,
  Text,
  VStack,
  useBreakpointValue,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  useToast,
} from "@chakra-ui/react"
import { EntryPoint } from "../../components/EntryPoint";
import{Layout}from "../../components/layout";
import theme from "../../styles/theme";
import ProductImage from "../../components/productImage";
import currency from 'currency.js'
import { getGraphqlClient } from "../../utils/gqlClient";
import { gql } from "@apollo/client";
import PrimaryButton from "../../components/primaryButton";
import KodawariButton from "../../components/kodawariButton";
import CRender from "../../components/cRender";
import { removeDuplicate } from "../../utils/arrUtil";
import AddToCartToast from "../../components/addToCartToast";
import { DonutsSubscriptionDetail, SubscriptionDetail } from "../../components/images/subscriptionDetail";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

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
interface ContentProps {
  product:any
}
const Content:FC<ContentProps> = ({product}) => {
  const [featureImage, setFeatureImage]= useState(product.featured_image)
  const [msgCardLists, setMsgCardLists]= useState([])
  const [productDetails, setProductDetails]= useState([])
  const [currentVariant, setCurrentVariant]= useState<any>()
  const [currentCard, setCurrentCard]= useState('')
  const [currentSetPlan, setCurrentSetPlan]= useState('')
  const [currentSetMenu, setCurrentSetMenu]= useState('')
  const selling_plan_groups = product.handle !== 'gift' ?   product.selling_plan_groups[0].selling_plans : []
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [maxQuantity, setMaxQuantity] = useState(product.variants.length === 1 ? product.variants[0].quantity : 12)
  const url = new URL(window.location.href)
  const pageHandle = decodeURI(url.pathname.replace('/products/', ''))
  const [isSubscription, setIsSubscription] = useState(false)
  const [selling_plan, setSellingPlan] = useState<string>('')
  const JPY = value => currency(value, { precision: 0, symbol: '¥' });
  const thumbnailSize = useBreakpointValue({base:"71px", md:"99px"})
  const isMobile = useBreakpointValue({base:true, md:false})
  const calcThumbnailMargin = (margin: string, i: number) => i > 0 && i % 3 === 0 ? "0px" : margin
  const QUANTITY  = Array.from({length: 12}, (v, i) => i+1)   
  const toast = useToast();
  const crumbs = [
    {name:'トップ', href:'/'},
    {name:'商品一覧', href:'/collections/all'},
    {name:product.title, href: `#`},
  ]
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
  },[])
  const setCurrentDonutFlavor = (variantId) => {
    setCurrentVariant(
      product.variants.find(v => {
        return v.id === parseInt(variantId)
      })
    )
  }
  const addToCartHandler = async() => {
    setLoading(true)
    console.log('currentSetPlan', currentSetPlan)
    console.log('currentCard', currentCard)
    console.log('currentMenu', currentSetMenu)
    let id = currentVariant ? currentVariant.id : '';
    if (product.handle === 'gift') {
      id = product.variants.find(v => (v.option1 === currentSetPlan && v.option2 === currentSetMenu && v.option3 === currentCard)).id
    }
    if (product.variants.length === 1) {
      id = product.variants[0].id
    }
    console.log('currentSellingPlan', selling_plan)
    console.log('quantity', quantity)
    console.log('currentVariant', id)

    let formData = {
      'items': [{
       id,
       quantity,
       selling_plan,
       }]
     };
     const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
     const cart = await fetch('/cart.js', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const resJson = await res.json()
    const cartJson = await cart.json()
    console.log("cart", cartJson);
    localStorage.setItem('cart', JSON.stringify(cartJson))
    if (res.status  === 200 ) {
      const productAdded = resJson.items[0]
      toast({
        position: "top-right",
        duration: 10000,
        render: () => <AddToCartToast product={productAdded} cartItemQty={cartJson.item_count}/>
      }); 
    } else {
      console.log(resJson);
      const {message, description} = resJson
      toast({
        position: "top-right",
        duration: 10000,
        isClosable: true,
        title: message,
        description,
        status: 'error',
      }); 
    }
    setLoading(false)
  }
  
  const showCalculatedPrice = (price: number, isDiscount: boolean) => {
    let p = price / 100
    if (isDiscount) {
        const discountVal = product.selling_plan_groups[0].selling_plans[0].price_adjustments[0].value
        const discPercentage = (100 - discountVal)/100
        p = p * discPercentage
        return (
          <Flex alignItems="center"　flexWrap={"wrap"} >
            <Text fontSize="16px" letterSpacing="0.075em" textDecoration={"line-through"} mr="10px">
              {JPY(price/ 100).format()} (税込）
            </Text>
            <Text fontSize="16px" letterSpacing="0.075em" >
              {JPY(p).format()} (税込）
            </Text>
            <Text variant="primary" fontSize={"20px"}>
              {discountVal}% OFF
            </Text>
          </Flex>
        )
    } else {
      return (
        <Text fontSize="16px" letterSpacing="0.075em" >
          {JPY(price/ 100).format()} (税込）
        </Text>
      )
    }
  }
  return (
    <>
      <CustomBreadcrumb crumbs={crumbs} />
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
                {/* PRICE */}
                {showCalculatedPrice(currentVariant ? (currentVariant as any).price :  product.price, product.handle !== "donut" ? isSubscription : false) }
                {/* BUYING OPTIONS */}
                {
                  product.available
                  ?
                   <>
                    {
                      product.handle !== "obento" && pageHandle !== "gift" &&
                        <>
                          <Flex mt="22px" justifyContent={{base:"space-between", md:"flex-start"}}>
                              <Box 
                                  onClick={() => {
                                      setIsSubscription(false)
                                      setSellingPlan('')
                                  }}
                                  bg={!isSubscription? "#EB6860" : "white" }　cursor="pointer"
                                  mr={{base:0, md:"16px"}}
                                  color={!isSubscription? "white" : "#707070" } fontSize={{base:"18px"}}
                                  px={{base:"14px", md: "28px"}}
                                  py="14px"
                                  w={{base:`calc(50% - 11px)`, md:"auto"}}
                                  borderRadius="10px"
                                  border={!isSubscription ? "solid 1px #EB6860" :"solid 1px #707070"}
                                  textAlign={"center"}
                              >
                                  単品購入
                              </Box>
                              <Box 
                                  textAlign={"center"}
                                  onClick={() => setIsSubscription(true)} bg={isSubscription? "#EB6860" : "white" }　cursor="pointer"
                                  px={{base:"14px", md: "28px"}}
                                  py="14px"
                                  w={{base:`calc(50% - 11px)`, md:"auto"}}
                                  borderRadius="10px"
                                  color={isSubscription? "white" : "#707070" } fontSize={{base:"18px"}}
                                  border={isSubscription ? "solid 1px #EB6860" :"solid 1px #707070"}
                              >
                                  定期購入
                              </Box>
                          </Flex>
                          {/* THE IMAGE FOR SUB DETAIL */}
                          {product.handle === 'donut'
                            ? <DonutsSubscriptionDetail mt={{md:"24px", base:"32px"}}/>
                            : <SubscriptionDetail mt={{md:"24px", base:"32px"}}/>
                          }

                          {/* THE SUB PERIOD */}
                          {
                            isSubscription &&
                            <Select placeholder="お届け間隔をお選びください" justifySelf="end" maxW="302px" 
                              onChange={(evt) => {
                                const val = evt.target.value
                                setSellingPlan(val)
                                console.log(val);
                              }} 
                              w="100%"
                              mt={{md:"24px", base:"32px"}}
                              >
                                {selling_plan_groups.map((t:any,i:number) => <option key={i} value={t.id}>{t.name}</option>)}
                            </Select>
                          }
                          {/* THE DONUT FLAVOR */}
                          {
                            pageHandle === "donut" && 
                            <Select placeholder="味を選んでください" justifySelf="end" maxW="302px" 
                              onChange={(evt) => {
                                const id = parseInt(evt.target.value)
                                const maxQty = product.variants.find(v => v.id === id).quantity
                                setMaxQuantity(maxQty)
                                if (quantity > maxQty) {
                                  setQuantity(maxQty)
                                }
                                setCurrentDonutFlavor(id)
                              }} 
                              w="100%" mt={{md:"24px", base:"32px"}}>
                              {product.variants.map((t:any,i:number) => 
                                <option 
                                  key={i}
                                  value={t.id}
                                >
                                  {t.title}
                                </option>
                              )}
                            </Select>
                          }
                          {/* THE ITEM NO */}
                          {
                            pageHandle !== "gift" &&
                            <Select placeholder="個数を入力してください" justifySelf="end" maxW="302px" onChange={(evt) => setQuantity(parseInt(evt.target.value))} w="100%" value={quantity} mt={{md:"24px", base:"32px"}}>
                              {QUANTITY.map((t:any,i:number) => 
                                  <option 
                                    key={i}
                                    value={t}
                                    disabled={t > maxQuantity}
                                    >
                                    {t} {t > maxQuantity ? `在庫が残り${maxQuantity}です` : ``}
                                  </option>
                              )}
                            </Select>
                          }
                      </>
                  }
                  {/* THE GIFT CARD AND PLAN */}
                  {
                    pageHandle === "gift" && 
                    <>
                      <Select placeholder="プランを選択してください" justifySelf="end" maxW="302px" onChange={(evt) => {
                        const val = evt.target.value
                        const cardLists = removeDuplicate(product.variants.filter(v => v.option1 === val), 'option3')
                        setMsgCardLists(cardLists)
                        if (!cardLists.includes(currentCard)) {
                          setCurrentCard('')
                        }
                        setCurrentSetPlan(val)
                      }} w="100%" mt={{md:"24px", base:"32px"}}>
                        {removeDuplicate(product.variants, 'option1').map((t:any,i:number) => <option key={i} value={t}>{t}</option>)}
                      </Select>
                      <Select placeholder="セットメニューを選択してください" justifySelf="end" maxW="302px" onChange={(evt) => setCurrentSetMenu(evt.target.value)} w="100%" mt={{md:"24px", base:"32px"}}>
                        {removeDuplicate(product.variants, 'option2').map((t:any,i:number) => <option key={i} value={t}>{t}</option>)}
                      </Select>
                      <Select placeholder="メッセージカードをお選びください" justifySelf="end" value={currentCard} maxW="302px" onChange={(evt) => setCurrentCard(evt.target.value)} w="100%" mt={{md:"24px", base:"32px"}}>
                        {msgCardLists.map((t:any,i:number) => <option key={i} value={t}>{t}</option>)}
                      </Select>

                    </>
                  }
                  {/* THE BUTTON */}
                  {
                    product.handle !== "gift" ?
                    <>
                      { 
                        product.handle === "obento"
                          ? <AddToCartBtn loading={loading} productHandle={product.handle}  href="/pages/choosing-plan" />
                          : <AddToCartBtn loading={loading} disabled={!quantity || (isSubscription && !selling_plan || (product.handle === "donut" && !currentVariant) )} productHandle={product.handle} onClick={addToCartHandler}/>
                      }
                    </>
                    : <AddToCartBtn loading={loading} disabled={!currentCard || !currentSetMenu || !currentSetPlan}  productHandle={product.handle} onClick={addToCartHandler}/>
                  }
                   </>
                  :　<ProductNotAvailable />
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
  const [product, setProduct] = useState<any>({})
  useEffect(() => {
    const p = (window as any).product
    localStorage.setItem('product', JSON.stringify(p))
    setProduct(p)
  },[])
  return (
    <Layout>
      <Container maxW={'7xl'} 
          pt={{md:"140px", base:"140px"}}
          pb={{md:"140px", base:"0"}}
          px="30px"
      >
          <VStack>
              <Box w="100%" maxW={{base:"100%", md:"960px"}}>
                {product.handle && <Content product={product}/>}
              </Box>
          </VStack>
      </Container>
    </Layout>
  )
}
export default Index


const ProductNotAvailable = () => <Text variant="primary" fontWeight="bold" pt="20px">在庫切れです</Text>


interface AddToCartProps {
  disabled?: boolean
  loading?: boolean
  productHandle: string
  onClick?: () => void
  href?:string
}
const AddToCartBtn:FC<AddToCartProps> = ({disabled, onClick, productHandle, href, loading}) => 
  <PrimaryButton
    loading={loading}
    disabled={disabled}
    onClick={disabled ? null : onClick}
    buttonProps={{height:"54px", mb:"57px", mt:"35px", fontSize:"15px", minW:"250px", w:{base: "100%", md: "fit-content"}}}
    title={productHandle === "obento" ? "プランとメニューを選んで購入" : "購入する"} 
    href={href} 
    rightIcon={productHandle === "obento" ? "" : "cart"} 
  />


EntryPoint(
  <ChakraProvider theme={theme}>
    <Index />
  </ChakraProvider>
);