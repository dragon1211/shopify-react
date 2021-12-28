import React, { FC, useEffect, useState } from "react";
import { 
  Box,
  ChakraProvider, 
  Text,
  useBreakpointValue,
  Flex,
  BoxProps,
  Image,
  Button,
  Select,
  Grid,
  theme, 
} from "@chakra-ui/react"
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { EntryPoint } from "../../components/EntryPoint";
import TriangleRightIcon from "../../components/icons/triangleRightIcon";
import { PageLayout } from "../../components/layout";
import PrimaryButton from "../../components/primaryButton";
import HeartIcon from "../../components/icons/heartIcon";

interface MenuCartProps extends BoxProps {
  selected_menus: any[];
  no_menu: number;
}
const MenuCart:FC<MenuCartProps> = (props) => {
  const {selected_menus, no_menu} = props
  const [openDrawer, setOpenDrawer] = useState(false)
  const imgDimension = useBreakpointValue({md:"60px", base:"50px"})
  const addToCart = () => {
    alert('add To cart')
  }
  return (
    <Box  {...props}
      minW="300px"
      pl={{base:0, md:"40px", lg:"60px"}}  
      pt={{base:"0px", md:"100px"}} 
      pos={{md:"initial", base: "sticky"}} 
      bottom={{md: 'none', base:0}} 
      zIndex={3}
    >
      <Flex px="30px"  h={{base:"60px", md:"70px"}} bg="#F0F0F0" justifyContent={{md:"center", base:"space-between"}} alignItems={"center"} fontWeight={600} letterSpacing={'.12em'} border="solid 1px #D3D3D3" borderBottom={"none"}>
        <Text cursor={"pointer"} onClick={() => setOpenDrawer(!openDrawer)} textDecor={"underline"} display={{base:"initial", md:"none"}} fontSize={12}>
          {openDrawer ? '内訳を閉じる' : '内訳表示'}
        </Text>
        {
          selected_menus.length === no_menu
          ?<PrimaryButton
            title="カートへ進む"
            rightIcon=""
            buttonProps={{disabled: selected_menus.length !== no_menu, height:"45px", w:"fit-content"}} 
            onClick={() => addToCart()}
          />
          :<Text fontSize={12}>
            <Text as={"span"} fontSize={18}>
              {selected_menus.length}/{no_menu}
            </Text>
            食 えらびました
          </Text>
        }
      </Flex>
      <Box 
        border="solid 1px #D3D3D3"
        borderTop={"none"}
        display={{base: openDrawer ? 'inherit' : 'none' , md:"inherit"}} 
        overflow={"auto"} 
        maxH="500px"
        bg="white"
        pos="relative"
      >
        {selected_menus.map((m: any, i: number) => 
          <Flex key={i} px={{md:"10px", base:"30px"}} py="28px" pos="relative"  alignItems={"center"}>
            <Flex fontSize={"14px"}  flexDir={"column"} alignItems={"center"} mr="16px">
              <Flex h="22px" w="22px" borderRadius={"full"} fontSize={"10px"}  bg="#D3D3D3" justifyContent={"center"} alignItems={"center"}>
                <MinusIcon color="white" />
              </Flex>
              <Box py="11px">
                {m.quantity}
              </Box>
              <Flex h="22px" w="22px" borderRadius={"full"} fontSize={"10px"}  bg="#EB6860" justifyContent={"center"} alignItems={"center"}>
                <AddIcon color="white" />
              </Flex>
            </Flex>
            <Image
              borderRadius={6}
              h={imgDimension}
              w={imgDimension}
              objectFit={"cover"}
              src={m.image}
              alt={m.image}
              fallbackSrc={m.image}
              mr={{base:"20px", md:"15px"}}
            />
            <Text bg="pink" fontSize={"12px"} w={{base:"200px", md:"55%"}}>
              {m.title}
            </Text>
          </Flex>
        )}
        <Box p="16px" pos="sticky" bottom={"0px"} bg="white" display={{base:"none", md:"inherit"}} borderTop="solid 1px #D3D3D3">
          <PrimaryButton
            title="カートへ進む"
            rightIcon=""
            buttonProps={{disabled: selected_menus.length !== no_menu, height:"50px", w:"100%"}} 
            onClick={() => addToCart()}
          />
        </Box>
      </Box>
    </Box>
  )
}

const ControlButtons = () => {
  const [filterVal, setFilterVal]= useState('')
  const filterHandler = (evt: any) => {    
    // window.location.href = evt.target.value === 'all' ? `/collections/all${url.search}` : `/collections/all/${evt.target.value}${url.search}`
  }
  return (
    <Flex flexWrap={"wrap"} justifyContent={"space-between"}>
      <Button variant={'accentBordered'} as='a' href="pages/menu-favorites" leftIcon={<HeartIcon />} mb={{base:"40px", md:"0px"}}>
        お気に入りメニューを表示
      </Button>
      <Select placeholder="絞り込み" value={filterVal} justifySelf="end" w="200px" onChange={(evt) => filterHandler(evt)}>
          <option>val1</option>
      </Select>
    </Flex>
  )
}

interface MenuPaginationProps {
  page: number
}
const MenuPagination:FC<MenuPaginationProps> = ({page}) => {
  const pages = Array.apply(null, Array(page)).map((x,i) => i)
  const [currentPage, setCurrentPage] = useState(1)
  const navClickable = (condition: boolean) => condition ? "#EB6960" : "#DEDEDE"
  const navSize = {w: "50px", h:"56px"}
  const navCtrl = {justifyContent:"center",  alignItems:"center", ...navSize}
  const backNav = {color: navClickable(currentPage > 1), border:`1px solid ${navClickable(currentPage > 1)}`}
  const forwArdNav = {color: navClickable(currentPage < 2), border:`1px solid ${navClickable(currentPage < 2)}`}
  return (
    <Box w="100%" pb="100px" pt="70px">
      {
        pages.length > 1 && 
        <Flex justifyContent={"space-between"}>
          <Flex {...navCtrl}  {...backNav} transform={"rotateY(180deg)"}>
            <TriangleRightIcon color={navClickable(currentPage > 1)}/>
          </Flex>
          <Flex>
            {pages.map((p,i) => <Box mx="20px" {...navSize} p="20px" color={currentPage === i+1 ? 'white' : "#EB6960"} bg={currentPage !== i+1 ? 'white' : "#EB6960"} border="solid 1px #EB6960" key={i}> {i+1}</Box>)}
          </Flex>
          <Flex {...navCtrl} {...forwArdNav}>
            <TriangleRightIcon color={navClickable(currentPage < 2)}/>
          </Flex>
        </Flex>
      }
    </Box>
  )
}

interface MenuItemProps {
  menu:{
    image: string;
    title: string
  }
}
const MenuItem:FC<MenuItemProps> = ({menu}) => {
  const imageSize = useBreakpointValue({md:"180px", base:"148px"})
  return (
    <Box 
      pos="relative"
      w={{md:"180px", base:"148px"}} 
      h={{md:"361px", base:"278px"}} 
      _notLast={{
        mr:{base:"20px", md:"40px"},
        mb:{base:"70px", md:"77px"},
      }}
    >
      <Image
        borderRadius={6}
        mb={{md:"30px", base:"24px"}}
        objectFit={"cover"}
        w={imageSize}
        h={imageSize}
        fallbackSrc={menu.image}
        src={menu.image}
        alt={menu.image}

      />
      <Text fontWeight={600} fontSize={{base:"14px", md:"16px"}} >
        {menu.title}
      </Text>
      <Flex pos="absolute" bottom="0">
        <Button h={{base:"33px", md: "36px"}} variant={"primary"} leftIcon={<AddIcon />} borderRadius={0} fontWeight={600} fontSize={{base:12, md:14}}>
          追加
        </Button>
      </Flex>
    </Box>
  )
}

const MenuLists = () => {
  const data = [
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名 メニュー名 メニュー名 メニュー名 メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title: "メニュー名"},
  ]
  const numberOfMenuToBeShown = useBreakpointValue({md:9, base:8})
  const menus = data.splice(0, numberOfMenuToBeShown)
  const pages = useBreakpointValue({md: Math.round(data.length / 9), base: Math.round(data.length / 8) })
  console.log(data);
  
  return (
    <>
      <Grid
        templateRows={{md:`repeat(${menus.length/6}, 1fr)`, base:`repeat(${menus.length/2}, 1fr)`}}
        templateColumns={{base:'repeat(2, 1fr)', md:'repeat(3, 1fr)'}}
        py={{base:"30px", md:"60px"}} 
        // gap={menus.length} 
      >
        {menus.map((m,i) => <MenuItem key={i} menu={m} />)}
      </Grid>
        <MenuPagination page={pages as number}/>
    </>
  )
}

enum PurchaseType {
  NULL="",
  NORMAL="NORMAL",
  SUBSCRIPTION="SUBSCRIPTION"
}

/**
 * @desc THE MAIN PAGE
 */
interface ContentProps {
  currItem: any
  no_menu: number
  selected_menus: any[]
}
const Content: FC<ContentProps> = ({currItem, selected_menus, no_menu}) => {
  return (
    <Box>
      {currItem && 
        <Flex pos="relative" >
          {/* id {currItem.id} 
          <br /> setSku {currItem.setSku}
          <br /> selling_plan {currItem.selling_plan} */}
          <Box w={{md:"620px", base: "100%"}}>
            <ControlButtons />
            <MenuLists />
          </Box>
          <MenuCart 
            display={{base:"none", md:"initial"}}
            no_menu={no_menu}
            selected_menus={selected_menus} 
            w={{base:"100%", md: "calc(100% - 620px)"}}
          />
        </Flex>
      }
    </Box>
  );
}




/**
 * @desc THE MAIN PAGE
 */
const Index = () => { 
  const [currItem, setCurrItem] = useState<any>()
  const crumbs = [
    {name:'トップ', href:'/'},
    {name:'商品一覧', href:'/collections/all'},
    {name:'お弁当', href: `/products/obento`},
    {name:'プラン選択', href: `/pages/choosing-plan`},
    {name:'メニュー選択', href: `#`},
  ]
  const getMenuNo = (arg: string) => parseInt(arg.replace( /^\D+/g, ''))
  const selected_menus: any[] = [
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 1},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 1},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 1},
    // {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 1},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 3},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 2},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 2},
    {image: "https://cdn.shopify.com/s/files/1/0574/4885/7790/products/Shopify_540x.png?v=1636357415", title:"メニュー名 メニュー名 メニュー名 メニュー名 メニュー名 メニュー名", quantity: 2},
  ]
  useEffect(() => {
      setCurrItem(JSON.parse(localStorage.getItem('currItem') as string))
  }, [])
  return (
    <>
    {
      currItem &&
      <>
        <PageLayout title="メニューを選択してください" crumbs={crumbs} containerProps={{pb:0}}>
          <Content currItem={currItem} no_menu={getMenuNo(currItem.setSku)} selected_menus={selected_menus} />
        </PageLayout>
        <MenuCart 
          display={{base:"inherit", md:"none"}}
          no_menu={getMenuNo(currItem.setSku)}
          selected_menus={selected_menus} 
          w="100%"
        />
      </>
    }
    </>
  )
}
export default Index

EntryPoint(
  <ChakraProvider theme={theme}>
    <Index />
  </ChakraProvider>
);

