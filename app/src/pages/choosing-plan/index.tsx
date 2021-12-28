import React, { FC, useEffect, useState } from "react";
import { 
  Box,
  VStack,
  Container,
  Text,
  useBreakpointValue,
  Flex,
  BoxProps,
  Divider,
  TextProps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ChakraProvider,
} from "@chakra-ui/react"
import currency from 'currency.js'
import { animateScroll } from 'react-scroll'
import ProgressBar from "../../components/progressBar";
import PrimaryButton from "../../components/primaryButton";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { EntryPoint } from "../../components/EntryPoint";
import theme from "../../styles/theme";
import CartIcon from "../../components/icons/cartIcon";
import { PageLayout } from "../../components/layout";

/**
 * @desc THE PRODUCT DETAIL COMPONENT
 */
interface ElItemProps {
  id: string
  title: string
  description?: string | JSX.Element
  small?:boolean
  boxProps?: BoxProps
  selected: boolean
  onSelect: (id:string) => void
}
const ElItem:FC<ElItemProps> = ({id, title, description, selected, onSelect, small, boxProps, children}) => {
  const width= {base:"100%", md: small ? "180px" : "320px"} 
  const px = {base:"14px", md: small ? "17px" : "22px"}
  const h = {base:"78px", md: small ? "162px" : "114px"}
  const scrollDistance = useBreakpointValue({md: 450, base: 400}) as number
  return (
    <Flex
      onClick={() => {
            animateScroll.scrollMore(scrollDistance, {
                smooth: 'easeInOut',
            })
          onSelect(id)
        }}
      bg={selected? "#EB6860" : "white" }
      cursor="pointer"
      {...boxProps}
      w={width}
      h={h}
      px={px}
      borderRadius="10px"
      mt="20px"
      _notLast={{
        mr:{base:"0px",md:"24px"}
      }}
      border={selected ? "solid 1px #EB6860" :"solid 1px #707070"}
      justifyContent="center"
      alignItems={{base:"flex-start", md:"center"}}
      direction="column"
      >
        <Text color={selected? "white" : "#707070" } fontSize={{base:"18px", md:"22px"}}>
          {title}
        </Text>
        {description && 
            typeof description === "object" 
            ? description
            : <Text color={selected? "white" : "#707070" } fontSize={{base:"14px",md:"16px"}}>
            {description}
            </Text>
        }
        {children}
    </ Flex>
  )
}

interface ElCardProps {
  title: string
  description?: string | JSX.Element
  boxProps?: BoxProps
}
 const ElCard:FC<ElCardProps> = ({title, description, boxProps, children}) => {
  return (
    <Box w="100%" textAlign={{base:"start", md:"center"}} {...boxProps} py={{base:"50px", md:"100px"}} position="relative">
      <Text variant="primary" fontSize={{base:"16px", md:"22px"}}>
        {title}
      </Text>
      <Text fontSize="15px" color="#493E34">
        {description}
      </Text>
      <Flex justifyContent="center" flexWrap="wrap" w="100%" h="100%">
        {children}
      </Flex>
    </Box>
  )
 }

interface ItemTextProps extends TextProps {
  selected: boolean;
}
const ItemText:FC<ItemTextProps> = (props) => {
  const {selected, fontSize, children} = props
  return <Text {...props} variant="choosingPlanText" color={selected? "white" : "#707070"} fontSize={fontSize || "14px"} letterSpacing=".075em">{children}</Text>
}

enum PurchaseType {
  NULL="",
  NORMAL="NORMAL",
  SUBSCRIPTION="SUBSCRIPTION"
}

/**
 * @desc THE MAIN PAGE
 */
interface  FormProps {
  purchaseType: string
  selling_plan?: string
  setNo: string
  setPlan: string
  giftCard?: string
}
interface ContentProps {
  setPlan: any
  setNo: any
  giftCard: any
  selling_plan_groups: any
  unitLabel: string
  productHandle: string
  submitForm: (form:any) => void
}
const Content: FC<ContentProps> = ({
  setPlan,
  setNo,
  giftCard,
  selling_plan_groups,
  unitLabel,
  productHandle,
  submitForm,
}) => {
  const JPY = (value:number) => currency(value, { precision: 0, symbol: '¥' });
  const [currStep, setCurrStep] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  const [form, setForm] = useState<FormProps>({
    purchaseType: '',
    selling_plan: '',
    setNo:'',
    setPlan:'',
  })
  const setValue = (
      attr: 'purchaseType' | 'selling_plan' | 'setNo' | 'setPlan' | 'giftCard',
      val: string
    ) => {
    const formProto = {...form}
    if (attr === 'purchaseType' ) {
      if (val === PurchaseType.NORMAL) {
        delete formProto.selling_plan
      } else if(!formProto.selling_plan) {
        formProto.selling_plan = ''
      }
    }
    formProto[`${attr}`] = val
    setForm(formProto)
    const formArr =  Object.keys(formProto)
    const filledPart = formArr.filter((k: string, i: number) => formProto[k as 'purchaseType' | 'selling_plan' | 'setNo' | 'setPlan'])
    setCurrStep(filledPart.length)
    if (formProto.setNo) {
      const n = setNo.find((no:any) => no.id === formProto.setNo)
      setFinalPrice(showCalculatedPrice(n, formProto.purchaseType === PurchaseType.SUBSCRIPTION))
    }
  }
  
  const showCalculatedPrice = (s: any, isDiscount: boolean) => {
    if (isDiscount) {
      // console.log(s.selling_plan_allocations[0].price);
    }
    
    return (isDiscount ? s.selling_plan_allocations[0].price :  s.price)/ 100
  }
  const calcSinglePrice = (s: string, price: number) => {
    var regex = /\d+/g;
    // console.log(s, price);
    if (!s || !/\d/.test(s)) {
      return ''
    }
    var int = parseInt(s.match(regex)![0]); 
    return JPY(price / int).format()
  }
  
  const steps = [
      {
        show: productHandle === 'gift',
        title: "メッセージカードをお選びください",
        items: giftCard.map((s:any,i:number) => ({title: s.option3, id:s.option3, selected: form.giftCard === s.option3, onSelect: () => setValue('giftCard', s.option3), small:false, description: ''})),
      },
      {
        show: productHandle !== 'gift',
        title: "購入スタイルをお選びください",
        items: [
            {title: "単品購入", id:PurchaseType.NORMAL, selected: form.purchaseType === PurchaseType.NORMAL, onSelect: () => setValue('purchaseType', PurchaseType.NORMAL), description:"お試しで買ってみたい方にオススメ", small: false },
            {title: "定期購入", id:PurchaseType.SUBSCRIPTION, selected: form.purchaseType === PurchaseType.SUBSCRIPTION, onSelect: () => setValue('purchaseType', PurchaseType.SUBSCRIPTION), description:"ずっとオトクに購入できます", small: false },
        ]
      },
      {
        show: true,
        title: "何食セットをご希望ですか？",
        description: productHandle !== 'yousan' &&  "食数が多いほどオトクに購入できます。",
        items: setNo.map((s:any,i:number) => ({title: s.option2, id:s.option2, selected: form.setNo === s.id, onSelect: () => {
          setValue('setNo', s.id)
        }, small:true, 
          description: 
          <>
            <Box display={{md: "block", base: "none"}} >
              <ItemText fontSize="22px" selected={form.setNo === s.id}>
                {JPY(showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION)).format()}
              </ItemText>
              <ItemText mt="17px" fontSize="16px" selected={form.setNo === s.id}>
                {calcSinglePrice(s.option2, showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION))} {calcSinglePrice(s.option2, showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION)) && '/'} {unitLabel}
              </ItemText>
            </Box>
              {
                (productHandle === 'yousan') 
                ?<Box display={{md: "none", base: "flex"}} alignItems="center">
                  <ItemText fontSize="22px" selected={form.setNo === s.id}>
                    {JPY(showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION)).format()}
                  </ItemText>
                    <ItemText fontSize="16px" selected={form.setNo === s.id} position="absolute" right="21px">
                      {calcSinglePrice(s.option2, showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION))} {calcSinglePrice(s.option2, showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION)) && '/'} {unitLabel}
                    </ItemText>
                </Box>
                : 
                <Box display={{md: "none", base: "block"}} position="absolute" right="21px" textAlign="end">
                  <ItemText fontSize="15px" selected={form.setNo === s.id}>
                    {JPY(showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION)).format()}
                  </ItemText>
                  <ItemText selected={form.setNo === s.id}>
                    {calcSinglePrice(s.option2, showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION))} {calcSinglePrice(s.option2, showCalculatedPrice(s, form.purchaseType === PurchaseType.SUBSCRIPTION)) && '/'} {unitLabel}
                  </ItemText>
                </Box>
              }
          </>
          })),
      },
      {
        show: form.purchaseType === PurchaseType.SUBSCRIPTION && productHandle !== 'yousan' && productHandle !== 'gift' ,
        title: "お届け間隔をお選びください",
        description: "",
        items: selling_plan_groups.map((s:any, i:any) =>   ({
            title: s.name, id:s.id, selected: form.selling_plan === s.id, onSelect: () => setValue('selling_plan', s.id), small:true, 
            description: <ItemText mt={{base:"0px", md:"16px"}} selected={form.selling_plan === s.id}>{s.description}</ItemText>})),
      },
      {
        show: productHandle !== 'yousan',
        title: "プランを選択してください",
        description: "食数が多いほどオトクに購入できます。",
        items: setPlan.map((s:any,i:number) => ({title: s.option1, id:s.option1, selected: form.setPlan === s.option1, onSelect: () => setValue('setPlan', s.option1), small:false, description: ''})),
      },
  ]

  const noChoosingMenu = productHandle !== 'obento' && productHandle !== 'osouzai' 

  const progress = currStep/ ((productHandle !== 'yousan' && productHandle !== 'gift' ) ? Object.keys(form).length : steps.filter(s => s.show).length) 
  return (
      <>
    <VStack justifyContent="center" position="relative" zIndex="2"  shadow="xl" bg="white" borderRadius="20px" mt={{base:"48px", md:"90px"}} px={{base:"18px", md:"41.5px"}}>
      {/* BUYING OPTIONS */}
      {
        steps.map((s, index) => 
        <Box key={index} w="100%">
            {s.show && 
              <>
                <ElCard title={s.title} >
                    {s.items.map((i: any, j:number) => <ElItem key={j} title={i.title} id={i.id} selected={i.selected} onSelect={() => i.onSelect()} description={i.description} small={i.small} />)}
                </ElCard>
                <Divider color="rgba(0,0,0,.2)" />
              </>
            }
        </Box>
        )
      }
      <Box position="sticky" bottom="0px" zIndex={2} height="auto" w="101%" textAlign="center" bg="white" 
          px={{base:"0px", md:"40px"}}
          py="40px"
      >
          <ProgressBar bg="white"  h="120px" display={{base: "none", md:"inherit"}} progressvalue={progress* 100} color="#EB6860" mb="30px" />
          <Flex justifyContent="center">
            <Flex pb={{base:"22px"}} justifyContent="center" w={{base:"100%", md:"440px"}}>
              <Box ml={{base:0, md:"-10%"}} w={{base:"100%", md:"60%"}} textAlign="start">
                <Box fontSize={{base:"15px", md:"20px"}}>
                  {form.purchaseType && (form.purchaseType === PurchaseType.SUBSCRIPTION ? "定期購入" : "単品購入")}
                  {form.selling_plan &&  selling_plan_groups.find((p:any) => p.id === form.selling_plan).name}
                  {form.giftCard &&  form.giftCard}
                </Box>
                <Box fontSize={{base:"14px", md:"16px"}}>
                  {form.setPlan}
                </Box>
              </Box>
              <Box w={{base:"50%", md:"40%"}} textAlign="end">
                <Text  variant="primary" fontSize={{base:"20px", md:"22px"}}>
                  {finalPrice > 0 && JPY(finalPrice).format()}
                </Text>
                {form.setNo && 
                  <Box fontSize={{base:"14px", md:"16px"}}>
                    {calcSinglePrice(setNo.find((p:any) => p.id === form.setNo).name, finalPrice)} {calcSinglePrice(setNo.find((p:any) => p.id === form.setNo).name, finalPrice) && '/'} {unitLabel} 
                  </Box>
                }
              </Box>
            </Flex>
          </Flex>
          <PrimaryButton 
            title={ noChoosingMenu ? "カートに追加する" : "メニューの選択へ進む" }
            href={noChoosingMenu ? "/pages/cart" :  "/pages/selecting-menu" }
            rightIcon="cart"
            buttonProps={{disabled: progress !== 1, height:"50px", w:{base:"100%", md: "auto"} }} 
            onClick={() => submitForm(form)}
            />
          {/* <Box 
            p="8"
            borderRadius="full"
            bg="black"
            color="white"
            onClick={() => submitForm(form)}
            >
              add to cart
          </Box> */}
      </Box>
    </VStack>
      </>
  );
}




/**
 * @desc THE MAIN PAGE
 */
const Index = () => { 
  const src = useBreakpointValue({base:"https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/planHeroSp.png", md:"https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/planHeroPc.png"})
  const [product, setProduct] = useState<any>({selling_plan_groups:[{selling_plans: []}], variants:[{option2:'', option1:''}]})
  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem('product') as string))
    console.log('prd', product);
    console.log('selling_plan_groups', selling_plan_groups);
    console.log('variant', product.variants);
    console.log('set number', setNo);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const selling_plan_groups =　product.handle !== 'gift' ?   product.selling_plan_groups[0].selling_plans : []
  const setNo = [product.variants[0]]
  const setPlan = [product.variants[0]]
  const giftCard = [product.variants[0]]
  product.variants.map((v:any) => {
    if (!setNo.find(n => n.option2 === v.option2)) {
      setNo.push(v)
    }
    if (!setPlan.find(n => n.option1 === v.option1)) {
      setPlan.push(v)
    }
    if (!giftCard.find(n => n.option3 === v.option3)) {
      giftCard.push(v)
    }
  })
  
  const findUnitLabel = () => {
    let unitLabel = '1食';
    switch (product.handle) {
      case 'yousan':
        unitLabel = '1袋'
        break;
    
      default:
        break;
    }
    return unitLabel
  }

  const setIdHandler = (product: any) => {
    switch (product.handle) {
      case 'donut' || 'yousan' || 'gift':
        return product.id
      default:
        return ''
    }
  }
  const crumbs = [
    {name:'トップ', href:'/'},
    {name:'商品一覧', href:'/collections/all'},
    {name:'お弁当', href:'/products/obento'},
    {name:'プラン選択', href:'#'},
  ]
  return (
    <PageLayout crumbs={crumbs}
      title={
        <Text textAlign="center" variant="pageTitle" zIndex={2} position="relative">
          お客様にあったプランを選択
        </Text>
      }>
      <Content 
        selling_plan_groups={selling_plan_groups}
        setNo={setNo}
        setPlan={setPlan}
        giftCard={giftCard}
        unitLabel={findUnitLabel()}
        productHandle={product.handle}
        submitForm={(form) => {
          const option2 = setNo.find((p:any) => p.id === form.setNo).option2
          const setSku = product.variants.find((v: any) => v.option1 === form.setPlan && v.option2 === option2).sku
          const id  = setIdHandler(product)
          const currItem = {id, selling_plan:form.selling_plan, setSku}
          console.log(currItem);
          
          localStorage.setItem('currItem', JSON.stringify(currItem))
        }}
      />
      <Box 
        w="100vw"
        h="722px"
        position="fixed" 
        top="70px"
        left="0"
        opacity=".5"
        backgroundImage={src}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        >
      </Box>
    </PageLayout>
  )
}
export default Index

EntryPoint(
  <ChakraProvider theme={theme}>
    <Index />
  </ChakraProvider>
);