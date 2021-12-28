import React, { useEffect, useState, FC } from "react";
import { 
  ChakraProvider, 
  Box,
  Button,
  HStack,
  VStack,
  Image,
  Text,
  Flex,
  BoxProps,
  useBreakpointValue
} from "@chakra-ui/react"
import { EntryPoint } from "../../components/EntryPoint";
import{Layout}from "../../components/layout";
import theme from "../../styles/theme";
import { gql } from "@apollo/client";
import { getGraphqlClient } from "../../utils/gqlClient";
import ChatBubble from "../../components/chatBubble";
import {
  FirstIcon,
  SecondIcon,
  ThirdIcon,
} from "../../components/icons/top/topPointSection/numberIcon";
import {
  FirstPic,
  SecondPic,
  ThirdPic,
} from "../../components/icons/top/topPointSection/pic";
import TriangleRightIcon from "../../components/icons/triangleRightIcon";
import { LineUpTitle } from "../../components/images/top/lineUp";
import { HowToFirstPic, HowToSecondPic, HowToThirdPic } from "../../components/icons/top/topHowToSection/pic";
import PrimaryButton from "../../components/primaryButton";

interface RedDotProps extends BoxProps {
  leftval: number
}
const RedDot:FC<RedDotProps> = (props) => {
  const size = useBreakpointValue({md:"9px", base:"6px"})
  const top = useBreakpointValue({md:"-6px", base:"-4px"})
  return <Box {...props} as="span" pos="absolute"  borderRadius="full" bg="#EB6860" h={size}  w={size} top={top} left={{base: `${props.leftval / 1.63}px`, md: `${props.leftval}px`}}  _before={{
    content:'" "'
  }} />
}

const TitleBox :FC<BoxProps> = (props) => {
  const {children} = props
  const boxProps = props
  return <Box {...boxProps} fontSize={{base:"25px", md:"40px"}} fontFamily={"Yu Gothic Pr6N D, sans-serif"} fontWeight={600} letterSpacing=".15em" lineHeight={{base:"1.84em",md:"1.75em"}}>{children}</Box>}
/**
 * @desc THE HERO SECTION
 */
 const Hero = () => {
  const url = useBreakpointValue({base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/hero-sp.png", md:"https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/hero.png"})
  return (
    <>
      <Image
        w="100vw"
        h="60vh"
        objectFit="cover"
        src={url}
        fallbackSrc={url}
        alt={url}
        />
        <TitleBox  h="40vh" justifyContent="center" display="flex" alignItems="center" flexDirection="column">
          <Text>
            ママの休食は、
          </Text>
          <Text>
            ママやご家族の
          </Text>
          <Text pos="relative">
            健<RedDot leftval={20}/>康<RedDot leftval={63}/>を応<RedDot leftval={157}/>援<RedDot leftval={202}/>する
          </Text>
          <Text>
            宅食サービスです。
          </Text>
          </TitleBox>
        
    </>
  );
};
/**
 * @desc THE CONTAINER FOR ALL SECTION
 */
const ContainerSection: FC = ({children}) => (
  <Box px={{base:"30px", md:"40px"}} pos="relative">
    <VStack
      // px={{base: "0", md: "120px"}}
      pt="100px"
    >
      <Box w={{base: "100%", xl: "1200px"}} position="relative" pl={{base: "0", md: "120px"}}>
          {children}
      </Box>
    </VStack>
  </Box>
);


/**
 * @desc THE TOP TITLE SECTION
 */
 interface TopTitleProps  {
  title: string
  subtitle: string
  boxProps?: BoxProps
}
const TopTitle: FC<TopTitleProps> = ({title, subtitle, boxProps}) => {
  return (
      <Box display={{base:"block", md:"flex"}} alignItems={{base:"none", md:"flex-end"}} {...boxProps} mb={{base:"40px", md: "70px"}}>
          <Text variant="primary" fontSize={{base: '50px', md: '50px'}} letterSpacing={"0.075em"} whiteSpace="nowrap" fontFamily={"'nort', sans-serif"}>
              {title}
          </Text>
          <Text fontSize={{base: '16px', md: '16px'}} pb="12px" ml={{base:"0px", md: "20px"}} letterSpacing=".2em">
              {subtitle}
          </Text>
      </Box>
  )
}

interface TopTitleDesc {
  desc: JSX.Element
  descMobile: JSX.Element
  boxProps?: BoxProps
}
const TopTitleDesc: FC<TopTitleDesc> = ({desc, descMobile, boxProps}) => {
  return (
      <Box {...boxProps}>
          <Text variant="topDescription" display={{base: "none", md: "block"}}>
            {desc}
          </Text>
          <Text variant="topDescription" display={{base: "block", md: "none"}}>
            {descMobile}
          </Text>
      </Box>
  )
}



/**
 * @desc THE ABOUT SECTION
 */
const AboutSection = () => {
  const url = useBreakpointValue({ base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/aboutSp.png", md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/aboutPc.png" })
  const header = "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/about-header.png"

  return (
    <ContainerSection>
      <TopTitle title="ABOUT" subtitle="ママの休食ができること" boxProps={{display: {base:"block", md: "none"}}}/>
      <Flex flexWrap={{base:"wrap-reverse", md: "wrap"}}>
        <Box 
          mr={{base: "0", md:"10px"}} 
          mb={{base:"0px", sm: "50px"}} 
          pos="relative"
          >
          <TopTitle title="ABOUT" subtitle="ママの休食ができること" boxProps={{display: {base:"none", md: "flex"}}}/>
          <TitleBox>
            <Text pos="relative" >
              ママに休<RedDot leftval={161} />養<RedDot leftval={202} />と
            </Text>
            <Text pos="relative">
              栄<RedDot leftval={16} />養<RedDot leftval={63} />を届けます
            </Text>
          </TitleBox>
            <TopTitleDesc
              boxProps={{mt:"-20px"}}
              desc={
                <>
                  子どもの健康な体をつくる給食があるように <br />
                  妊娠中や子育て中のママにも、<br />
                  栄養バランスの取れた「休食」を。<br />
                  元気なママは家族の健康のみなもとです。
                </>
              }
              descMobile={
                <>
                  子どもの健康な体をつくる給食があるように妊娠中や子育て中のママにも、栄養バランスの取れた「休食」を。元気なママは家族の健康のみなもとです。
                </>
              }
            />
        </Box>
        <Image
          mb={{base: "40px", md:"0"}}
          h={{base: "auto"}}
          maxWidth={{base:"calc(100vw - 30px)", md:"500px"}}
          src={url}
          fallbackSrc={url}
          alt={url}
          />
      </Flex>
    </ContainerSection>
  );
};
/**
 * @desc THE POINT SECTION
 */
interface PropsItem {
  pic: JSX.Element
  icon: JSX.Element
  title: string | JSX.Element
  description: string
  boxProps?: BoxProps
}
const PointItem:FC<PropsItem> = ({pic, icon, title, description, boxProps}) => (
  <Box position="relative" {...boxProps}>
    <Flex align="flex-end" marginBottom="-1.5em" zIndex="2" position="relative">
      {icon}
      <Text ml="1em" w="220px" fontSize="18px" lineHeight="32px" fontFamily={"Yu Gothic Pr6N D, sans-serif"}>
        {title}
      </Text>
    </Flex>
    {pic}
    <Text mt="35px" w={{base:"290px", md:"280px"}} lineHeight="32px">
      {description}
    </Text>
  </Box>
)
 const Point = () => {
   return (
     <Flex justify="center" mt="100px">
      <Box px={{base: "0px", md:"40px"}} w="1280px">
        <ChatBubble>
          <TopTitle title="POINT" subtitle="休養と栄養のポイント" />
            <Flex flexWrap="wrap" justify={{base:"center", md:"flex-start"}} mb="50px">
                <PointItem pic={<FirstPic />} title={<>栄養バランスにこだわった <br />お弁当やおかずをお届け</>} description="ママの休食独自の栄養価基準を元に、管理栄養士がレシピを作成しています。" icon={<FirstIcon />} boxProps={{
                  mr: {base:"0px", md:"60px"},
                  mb:"40px"
                }} />
                <PointItem pic={<SecondPic />} title={<>ご家庭の家事の<br />負担軽減をお手伝い</>} description="商品は温めるだけの簡単調理メニューや、気軽に取り入れられるサプリ。忙しい日の味方です。" icon={<SecondIcon />} boxProps={{
                  mr: {base:"0px", md:"60px"},
                  mb:"40px"
                }} />
                <PointItem pic={<ThirdPic />} title={<>おいしくて安心安全 <br />ご家族の健康も守ります</>} description="ご家族全員で楽しんでいただけるラインナップ。食材の産地や鮮度もこだわり抜いています。" icon={<ThirdIcon />} />
            </Flex>
            <Flex justify="center">
              <PrimaryButton title="ママの休食について" href="/pages/about" />
            </Flex>
        </ChatBubble>
      </Box>
     </Flex>
   )
 }


 /**
 * @desc THE LINE UP
 */
interface LineUpItemProps {
  imageUrl: string
  title: string
  desc: string
  theme?: string
  menuUrl?: string // open the menu with filtered base on the product chose
  firstBtnTxt?: string
  productDetailUrl?: string // open the product detail page
  secondBtnTxt?: string
}
const LineUpItem:FC<LineUpItemProps> = ({imageUrl, title, desc, menuUrl, productDetailUrl, firstBtnTxt, secondBtnTxt, theme}) => {
  const [opacity, setOpacity] = useState(1)
  const [opacity2, setOpacity2] = useState(1)
  return (
    <Box w={{base:"100%", md:"280px"}} h={{base:"fit-content", md:"550px"}} position="relative" mb={{base: "80px", md:"60px"}} mr={{base: "0px", md:"60px"}} >
      <Image 
        mb={{base:"24px", md:"30px"}}
        w="100%"
        h="300px"
        // objectFit="cover"
        src={imageUrl}
        alt={imageUrl}
        fallbackSrc={imageUrl}
      />
      <Text 
        mb={{base:"24px", md:"30px"}}
        fontSize="22px"
        fontFamily={"Yu Gothic Pr6N D, sans-serif"}
      >
        {title}
      </Text>
      <Text
        mb="40px"
        fontSize="16px"
        lineHeight="24px"
      >
        {desc}
      </Text>
      <Box 
        alignItems="flex-end" 
        position={{md:"absolute", base:"inherit"}} 
        bottom="0px" right="0px"
        display={{base:"flex", md:"inherit"}}
        justifyContent={{base:"flex-end", md:"inherit"}}
        >
          {/* {menuUrl && <Box as={'a'} href={menuUrl} _hover={{opacity:.5}}  onMouseOver={() => setOpacity(.5)} onMouseLeave={() => setOpacity(1)} >
            {firstBtnTxt ? firstBtnTxt : 'メニューをみる'}
            <Box mt="-10px">
              <svg xmlns="http://www.w3.org/2000/svg" width="161.081" height="13.443" viewBox="0 0 161.081 13.443" opacity={opacity}>
                <path id="Path_250" data-name="Path 250" d="M423.01,4313.776l15.979,11.086a.294.294,0,0,1-.168.535H279.051" transform="translate(-279.051 -4312.954)" fill="none" stroke={theme} strokeMiterlimit="10" strokeWidth="2"/>
              </svg>
            </Box>
          </Box>} */}
          <Box h="20px"></Box>
          {productDetailUrl && <Box as={'a'} href={productDetailUrl}  _hover={{opacity:.5}} onMouseOver={() => setOpacity2(.5)} onMouseLeave={() => setOpacity2(1)} >
            {secondBtnTxt ? secondBtnTxt : '購入する'}
            <Box mt="-10px">
              <svg xmlns="http://www.w3.org/2000/svg" width="161.081" height="13.443" viewBox="0 0 161.081 13.443" opacity={opacity2}>
                <path id="Path_250" data-name="Path 250" d="M423.01,4313.776l15.979,11.086a.294.294,0,0,1-.168.535H279.051" transform="translate(-279.051 -4312.954)" fill="none" stroke={theme} strokeMiterlimit="10" strokeWidth="2"/>
              </svg>
            </Box>
          </Box>}
      </Box>
    </Box>
  )
}


 const LineUp = () => {
  const items: LineUpItemProps[] = [
    {
      imageUrl: 'https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/c_bento.png',
      title: 'お弁当',
      desc:'丸ごとレンジで温めるだけ。1食の栄養バランスもバッチリの頼れるお弁当。',
      theme: "#42B04D",
      menuUrl:"/pages/menuLists",
      productDetailUrl:"/products/obento",
    },
    {
      imageUrl: 'https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/c_osozai.png',
      title: 'お惣菜',
      desc:'共働き家庭の救世主。元シェフと管理栄養士が共同でレシピ開発した家族の栄養が整う彩りお惣菜。',
      theme: "#EB6860",
      menuUrl:"/pages/menuLists?category=osouzai",
      productDetailUrl:"/products/osouzai",
    },
    {
      imageUrl: 'https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/c_sweets.png',
      title: 'スイーツ',
      desc:`原材料にこだわった、罪悪感なしで食べられるヘルシーなスイーツ。`,
      theme: "#F5D85E",
      menuUrl:"/pages/menuLists?category=sweets",
      productDetailUrl:"/products/donut",
    },
    {
      imageUrl: 'https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/c_supplements.png',
      title: 'サプリメント',
      desc:`ママのステージに合わせて
      不足しがちな栄養チャージを
      サポート。`,
      theme: "#EB6860",
      productDetailUrl:"/products/yousan"
    },
    {
      imageUrl: 'https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/c_gift.png',
      title: 'ギフト',
      desc:`友人や家族、お世話になっている
      方に心を込めて贈りたい”ママの
      休食のギフトセレクション”`,
      theme: "#F5D85E",
      firstBtnTxt:"ギフトのご案内",
      secondBtnTxt:"ギフトを選ぶ",
      menuUrl:"/pages/giftGuide",
      productDetailUrl:"/products/gift",
    },
  ]
  return (
    <ContainerSection>
      <Box>
        <TopTitle title="LINEUP" subtitle="ラインナップ" />
        <LineUpTitle/>
        <TopTitleDesc 
          desc={
            <>
              ママと家族に必要な栄養がしっかり摂れる、<br />
              シーンやライフスタイルにあわせてお選びいただけるメニューです。
            </>
          }
          descMobile={
            <>
              ママと家族に必要な栄養がしっかり摂れる、シーンやライフスタイルにあわせてお選びいただけるメニューです。
            </>
          }
        />
        <Flex flexWrap="wrap" mt="50px" >
            {items.map((it,i) => <LineUpItem
              key={i}
              menuUrl={it.menuUrl}
              firstBtnTxt={it.firstBtnTxt}
              secondBtnTxt={it.secondBtnTxt}
              productDetailUrl={it.productDetailUrl}
              title={it.title}
              desc={it.desc}
              imageUrl={it.imageUrl}
              theme={it.theme}
              />
            )}
        </Flex>
        <Flex justify="center" mt="80px">
          <PrimaryButton title="商品一覧" buttonProps={{w:"250px"}}　href="/collections/all" />
        </Flex>
      </Box>
    </ContainerSection>
    
  )
 }
/**
 * @desc THE HOW TO SECTION
 */
 interface HowToPropsItem {
  pic: JSX.Element
  icon: JSX.Element
  title: string
  description: string
  boxProps?: BoxProps
}
const HowToItem:FC<HowToPropsItem> = ({pic, icon, title, description, boxProps}) => (
  <Box position="relative" {...boxProps}>
    <Box ml={{base:"0px",md:"-30px"}} w={{base:"280px",md:"auto"}}>
      {pic}
    </Box>
    <Flex align="flex-start"  mt="30px">
      {icon}
      <Box ml="20px">
        <Text fontSize="22px" mb="10px">
          {title}
        </Text>
        <Text  w={{base:"250px", md:"200px"}} lineHeight="24px">
          {description}
        </Text>
      </Box>
    </Flex>
  </Box>
)
const HowTo = () => {
  return (
    <Flex justify="center" mt="200px">
     <Box px={{base: "0px", md:"40px"}} w="1280px">
      <TopTitle title="HOW TO" subtitle="ご利用の流れ" boxProps={{px:{base: "30px", md: "120px"}}} />
       <ChatBubble>
         <Flex flexWrap="wrap" justify={{base:"center", md:"flex-start"}}>
          <HowToItem pic={<HowToFirstPic />} title="サイトで注文" description="当サイトから簡単ご注文。お好きなメニューをお選びください。" icon={<FirstIcon />} boxProps={{
              mb:"40px"
            }} />
            <Box display={{base:"none", md: "flex"}} mx="10px" alignItems="center" h="280px">
              <svg xmlns="http://www.w3.org/2000/svg" width="40.346" height="19.997" viewBox="0 0 40.346 19.997">
                <path id="Path_744" data-name="Path 744" d="M420.426,675.812h-26.52a1.5,1.5,0,0,0,0,3h26.52A1.5,1.5,0,0,0,420.426,675.812Zm11.927-.267A49.99,49.99,0,0,0,416.116,667c-1.849-.569-2.64,2.325-.8,2.893a46.225,46.225,0,0,1,13.43,6.662l-10.833,7.563a1.54,1.54,0,0,0-.538,2.052,1.513,1.513,0,0,0,2.053.538l12.618-8.81A1.516,1.516,0,0,0,432.353,675.545Z" transform="translate(-392.457 -666.928)" fill="#84807e"/>
              </svg>
            </Box>
            <HowToItem pic={<HowToSecondPic />} title="ご自宅へお届け" description="品質にこだわってお作りしている工場から、全国へお届け。" icon={<SecondIcon />} boxProps={{
              mb:"40px"
            }} />
            <Box display={{base:"none", md: "flex"}} mx="10px" alignItems="center" h="280px">
              <svg xmlns="http://www.w3.org/2000/svg" width="40.346" height="19.997" viewBox="0 0 40.346 19.997">
                <path id="Path_744" data-name="Path 744" d="M420.426,675.812h-26.52a1.5,1.5,0,0,0,0,3h26.52A1.5,1.5,0,0,0,420.426,675.812Zm11.927-.267A49.99,49.99,0,0,0,416.116,667c-1.849-.569-2.64,2.325-.8,2.893a46.225,46.225,0,0,1,13.43,6.662l-10.833,7.563a1.54,1.54,0,0,0-.538,2.052,1.513,1.513,0,0,0,2.053.538l12.618-8.81A1.516,1.516,0,0,0,432.353,675.545Z" transform="translate(-392.457 -666.928)" fill="#84807e"/>
              </svg>
            </Box>
            <HowToItem pic={<HowToThirdPic />} title="調理の手間はナシ" description="冷凍メニューは温めるだけの簡単調理。" icon={<ThirdIcon />} />
         </Flex>
       </ChatBubble>
     </Box>
    </Flex>
  )
}

/**
 * @desc THE HERO IMAGE 2 PAGE
 */
const Hero2 = () => (
  <Image 
    mt={{base:"80px", md:"200px"}}
    mb={{base:"0px", md:"100px"}} // because pt 100px is already in the Container Section in information
    w="100%"
    alt="hero2"
    src={useBreakpointValue({ base: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/hero2Sp.png", md: "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/hero2Pc.png" })}
  />
)

/**
 * @desc THE INFORMATION SECTION
 */
interface GalleryLayoutProps {
  buttonUrl?: string
}
const GalleryLayout:FC<GalleryLayoutProps> = ({buttonUrl,children}) => {
  const leftIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27.827" height="27.827" viewBox="0 0 27.827 27.827">
  <g id="Group_442" data-name="Group 442" transform="translate(-160.272 -5946.149)">
    <rect id="Rectangle_354" data-name="Rectangle 354" width="9.276" height="9.276" transform="translate(188.099 5973.976) rotate(180)" fill="#eb6860"/>
    <rect id="Rectangle_355" data-name="Rectangle 355" width="9.276" height="9.276" transform="translate(188.099 5955.425) rotate(180)" fill="#eb6860"/>
    <rect id="Rectangle_356" data-name="Rectangle 356" width="9.276" height="9.276" transform="translate(178.824 5964.7) rotate(180)" fill="#eb6860"/>
    <rect id="Rectangle_357" data-name="Rectangle 357" width="9.276" height="9.276" transform="translate(169.548 5955.425) rotate(180)" fill="#eb6860"/>
    <rect id="Rectangle_358" data-name="Rectangle 358" width="9.276" height="9.276" transform="translate(169.548 5973.976) rotate(180)" fill="#eb6860"/>
  </g>
</svg>
  return (
    <Box 
      pb="40px"
      bg="#F0F0F0"
      width={{base: "100%",md:"90vw"}}
      borderTopRightRadius={{base:"50px", md:"200px"}}
      top={{md:"200px", base: "230px"}}
      left={0}
      pos="absolute"
      >
        <Box px={{base:"30px", md:"40px"}}  w="90%">
          <VStack>
              <Box w={{base: "100%", xl: "100%"}} position="relative" pl={{base: "0", md: "calc(40% - 120px)"}} h="200px">                
                {buttonUrl && <Button variant="accent" leftIcon={leftIcon} as={'a'} href={buttonUrl}>
                    一覧を見る
                </Button>}
              </Box>
          </VStack>
        </Box>
    </Box>
  )
}
interface InfoItem {
  tag: string
  title:string
  sys:{
    id:string
    publishedAt: string
  }
  description: string
}
interface InfoProps {
  infoItems: InfoItem[]
}
const Information:FC<InfoProps> = ({infoItems}) => {
  return(
    <Box pos={"relative"}>
      <ContainerSection>
        {/* <TopTitle title="INFORMATION" subtitle="新着情報"/> */}
        <TopTitle title="RELEASE" subtitle="機能リリース情報"/>
        <Box mt="50px" mb="30px" zIndex={2} pos={"relative"} w={{base:"100%", md:"80%"}}>
          {infoItems.map((info,i) => 
            <Box 
              display={{base:"inherit", md: "flex"}} 
              key={i} 
              bg="white" _hover={{opacity:.5}} 
              px="15px"
              py="10px" 
              mb="10px" 
              as={'a'} 
              href={`/pages/information-details?id=${info.sys.id}`} 
              pos="relative" 
              alignItems={"center"} 
            >
              {/* 
                <Text mr="10px">
                {fmt(parse(info.sys.publishedAt), "yyyy.MM.dd")}
                </Text>
              */}
              <Text 
                  w={{base:"90%"}}
                  // overflow="hidden"
                  // textOverflow="ellipsis"
                  // whiteSpace="nowrap"
                >
                {info.title}
              </Text>
              {/* <TriangleRightIcon alignSelf="center" color="#EB6860" flexGrow={1} display="flex" justifyContent="flex-end" /> */}
              <TriangleRightIcon pos="absolute" right="1em" bottom="38%" color="#EB6860" />
            </Box>
          )}
        </Box>
      </ContainerSection>
      <GalleryLayout />
      {/* <GalleryLayout buttonUrl="/pages/informations"> */}
    </Box>
  )
}
interface RecipeItem {
  sys: {
    id: string
    publishedAt: string
  }
  title: string
  thumbnail: {
    url:string
  }
  content: {
    json: any
  }
}
interface RecipeProps {
  recipes: RecipeItem[]
}
const Recipe:FC<RecipeProps> = ({recipes}) => {
  const rBg = useBreakpointValue({
    base: <svg xmlns="http://www.w3.org/2000/svg" width="293.229" height="183.043" viewBox="0 0 293.229 183.043">
        <path id="Rectangle_1367" data-name="Rectangle 1367" d="M0,0H228.749a64.48,64.48,0,0,1,64.48,64.48V183.043a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" fill="#f5d85e"/>
      </svg>,
    md:<svg xmlns="http://www.w3.org/2000/svg" width="264" height="164.797" viewBox="0 0 264 164.797">
        <path id="Rectangle_1367" data-name="Rectangle 1367" d="M0,0H199.52A64.48,64.48,0,0,1,264,64.48V164.8a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" fill="#f5d85e"/>
      </svg>,
  })

  return(
    <Box mt={{base:"0px", md:"100px"}}>
      <ContainerSection>
        <TopTitle title="RECIPE" subtitle="商品アレンジレシピ"/>
      </ContainerSection>
      <Box mt={{base:"0px", md:"80px"}}>
        <GalleryLayout buttonUrl="/pages/recipes">
          <Flex mb="30px" mt={{base:"50px", md:"-100px"}} flexWrap="wrap" justifyContent={{base:"center", md: "flex-start"}}>
            {recipes.map((recipe,i) => 
              <Box key={i} mr={{base: "0px", md:"60px"}} position="relative" h={{base:"340px", md:"330px"}} w={{base:"100%", md: "fit-content"}} mb={{base: "40px", md:"0px"}} maxW="300px">
                <Box position="relative">
                  <Image
                    alt={recipe.thumbnail.url}
                    w={{base:"293px", md:"265px"}}
                    h={{base:"183px", md:"160px"}}
                    objectFit="cover"
                    src={recipe.thumbnail.url}
                    borderTopRightRadius="60px"
                    fallbackSrc={recipe.thumbnail.url}
                    position="relative"
                    zIndex="2"
                  />
                  <Box position="absolute" top={{base:"20px", md:"15px"}} left={{base:"20px", md:"10px"}}>
                    {rBg}
                  </Box>
                </Box>
                <Text mt="40px" fontSize="22px" w="170px">
                  {recipe.title}
                </Text>
                <Box position="absolute" bottom="0px" right="0px">
                  <Box  href={`/pages/recipe-details?id=${recipe.sys.id}`} as={'a'}>
                    このレシピをみる
                    <svg xmlns="http://www.w3.org/2000/svg" width="161.081" height="13.443" viewBox="0 0 161.081 13.443">
                        <path id="Path_250" data-name="Path 250" d="M423.01,4313.776l15.979,11.086a.294.294,0,0,1-.168.535H279.051" transform="translate(-279.051 -4312.954)" fill="none" stroke="#F5D85E" strokeMiterlimit="10" strokeWidth="2"/>
                    </svg>
                  </Box>
                </Box>
              </Box>
            )}
          </Flex>
        </GalleryLayout>
      </Box>
    </Box>
  )
}
const Media = () => {
  const url = "https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/mediaImage.png"
  return(
    <Box mt={{base:"0px", md:"150px"}}>
      <ContainerSection>
        <TopTitle title="MEDIA" subtitle="メディア紹介実績"/>
      </ContainerSection>
      <Box mt="-90px" >
        <Box
          pt="46px"
          pb="55px"
          bg="#F0F0F0"
          width="100%"
        >
          <HStack justifyContent="center" py="40px">
            <Image 
              w="fit-content"
              src={url}
              alt={url}
              fallbackSrc={url}
              />
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}
const FinalSection = () => {
  const url= useBreakpointValue({
    base:"https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/finalImageSp.png",
    md:"https://mamkayu-assets.s3.ap-northeast-1.amazonaws.com/finalImagePc.png",
  })
  const sns = [
    {
      // facebook
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path id="Path_295" data-name="Path 295" d="M536.667,7201.163a20.237,20.237,0,0,0,16.667,19.888v-14.445h-5v-5.555h5v-4.445c0-5,3.221-7.776,7.778-7.776a30.1,30.1,0,0,1,4.443.443v5.112H563c-2.445,0-3,1.221-3,2.778v3.888h5.334l-.889,5.555H560v14.445a20.129,20.129,0,1,0-23.333-19.888Z" transform="translate(-536.667 -7181.051)" fill="#eb6860" fillRule="evenodd"/></svg>,
      url: 'https://www.facebook.com/mamanokyushoku',
    },
    {
      // instagram
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="36.667" height="36.667" viewBox="0 0 36.667 36.667"><path id="Path_296" data-name="Path 296" d="M651.514,7193.034a2.227,2.227,0,1,0-1.562.608A2.232,2.232,0,0,0,651.514,7193.034Zm-18.177,1.357a9.424,9.424,0,1,1-2.76,6.663A9.428,9.428,0,0,1,633.337,7194.391Zm4.322,12.315a6.115,6.115,0,1,0-2.191-1.544A6.117,6.117,0,0,0,637.659,7206.706Zm9.75-20.575c-1.934-.088-2.514-.107-7.409-.107s-5.475.019-7.408.107a10.134,10.134,0,0,0-3.4.632,6.053,6.053,0,0,0-3.478,3.478,10.132,10.132,0,0,0-.632,3.4c-.088,1.933-.107,2.513-.107,7.408s.019,5.475.107,7.409a10.135,10.135,0,0,0,.632,3.405,6.057,6.057,0,0,0,3.478,3.478,10.138,10.138,0,0,0,3.4.632c1.933.088,2.512.106,7.408.106s5.475-.018,7.409-.106a10.138,10.138,0,0,0,3.405-.632,6.057,6.057,0,0,0,3.478-3.478,10.136,10.136,0,0,0,.632-3.405c.088-1.934.106-2.514.106-7.409s-.018-5.475-.106-7.408a10.133,10.133,0,0,0-.632-3.4,6.053,6.053,0,0,0-3.478-3.478A10.135,10.135,0,0,0,647.409,7186.131Zm-14.967-3.3c1.955-.09,2.578-.11,7.558-.11s5.6.022,7.557.11a13.463,13.463,0,0,1,4.453.852,9.377,9.377,0,0,1,5.36,5.361,13.468,13.468,0,0,1,.854,4.45c.09,1.959.11,2.582.11,7.56s-.022,5.6-.11,7.559a13.441,13.441,0,0,1-.854,4.45,9.355,9.355,0,0,1-5.36,5.361,13.454,13.454,0,0,1-4.45.854c-1.956.09-2.58.11-7.56.11s-5.6-.022-7.558-.11a13.434,13.434,0,0,1-4.45-.854,9.366,9.366,0,0,1-5.363-5.36,13.518,13.518,0,0,1-.852-4.45c-.09-1.958-.11-2.581-.11-7.56s.022-5.6.11-7.556a13.476,13.476,0,0,1,.852-4.454,9.39,9.39,0,0,1,5.361-5.361,13.515,13.515,0,0,1,4.45-.852Z" transform="translate(-621.667 -7182.721)" fill="#eb6860" fillRule="evenodd"/></svg>,
      url: 'https://www.instagram.com/mama9_2020/?hl=ja',
    },
    {
      // TIKTOK
      icon: 
        <svg id="tiktok_logo_icon_144802" xmlns="http://www.w3.org/2000/svg" width="33.152" height="37.854" viewBox="0 0 33.152 37.854">
          <path id="tiktok_logo_icon_144802-2" data-name="tiktok_logo_icon_144802" d="M19.518.032C21.6,0,23.668.019,25.735,0a9.786,9.786,0,0,0,2.782,6.581A11.272,11.272,0,0,0,35.256,9.4v6.352a17,17,0,0,1-6.678-1.527A19.362,19.362,0,0,1,26,12.76c-.011,4.609.019,9.212-.03,13.8A11.915,11.915,0,0,1,14.425,37.838a11.641,11.641,0,0,1-6.483-1.62,11.878,11.878,0,0,1-5.8-9.009c-.038-.789-.051-1.577-.019-2.347A11.959,11.959,0,0,1,16,14.319c.032,2.336-.062,4.671-.062,7.007a5.578,5.578,0,0,0-4.8.586,5.47,5.47,0,0,0-2.169,2.76,6.222,6.222,0,0,0-.216,2.538A5.44,5.44,0,0,0,18.724,29.2a3.7,3.7,0,0,0,.652-1.676c.156-2.821.094-5.631.113-8.453.013-6.359-.019-12.7.03-19.038Z" transform="translate(-2.105)" fill="#eb6860"/>
        </svg>,
      url: 'https://www.tiktok.com/@mama9_official?lang=ja-JP',
    },
    {
      // twitter
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="37.843" height="30.764" viewBox="0 0 37.843 30.764"><path id="Path_294" data-name="Path 294" d="M491.667,7189.318a15.527,15.527,0,0,1-4.458,1.222,7.782,7.782,0,0,0,3.413-4.3,15.519,15.519,0,0,1-4.93,1.884,7.767,7.767,0,0,0-13.23,7.083,22.048,22.048,0,0,1-16-8.113,7.77,7.77,0,0,0,2.4,10.366,7.751,7.751,0,0,1-3.517-.971v.1a7.769,7.769,0,0,0,6.229,7.613,7.808,7.808,0,0,1-3.507.133,7.766,7.766,0,0,0,7.253,5.39,15.681,15.681,0,0,1-11.5,3.217,21.953,21.953,0,0,0,11.9,3.488c14.283,0,22.091-11.83,22.091-22.09,0-.333-.008-.67-.023-1a15.765,15.765,0,0,0,3.872-4.017Z" transform="translate(-453.824 -7185.669)" fill="#eb6860"/></svg>,
      url: 'https://twitter.com/mamano9shoku',
    },
    {
      // note
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="33.333" height="33.541" viewBox="0 0 33.333 33.541"><path id="Path_293" data-name="Path 293" d="M786.905,7214.228v-16.77h7.738a1.792,1.792,0,0,0,1.786-1.8v-7.786H813.1v26.353Zm5.953-26.063v5.7h-5.664Zm-9.524,5.99v20.073a3.583,3.583,0,0,0,3.571,3.594H813.1a3.583,3.583,0,0,0,3.571-3.594v-26.353a3.583,3.583,0,0,0-3.571-3.594h-19.95a3.561,3.561,0,0,0-2.525,1.053l-6.241,6.28A3.605,3.605,0,0,0,783.334,7194.155Z" transform="translate(-783.334 -7184.281)" fill="#eb6860"/></svg>,
      url: 'https://note.com/mama9',
    },
  ]
  return(
    <VStack alignItems="center">
        <Box pt={{base:"100px", md:"300px"}} >
          <Text letterSpacing="0.03em" variant="primary" fontFamily={"'nort', sans-serif"} fontSize="25">
            Follow us !
          </Text>
        </Box>
        <Flex w={{base:"250px", md:"100%"}} justifyContent="center" pl={{base:"30px", md:"0px"}} pt="30px" pb={{base:"80px", md:"170px"}}>
            <Flex justifyContent="center" alignItems="center"  flexWrap="wrap" w="100%">
              {sns.map((s,i) => 
                <Box key={i} as='a' href={s.url} mr={{base:"30px", md:"40px"}} mb={{base:"30px", md:"0px"}} >{s.icon}</Box>
              )}
            </Flex>
        </Flex>
        <Image 
          w="100vw"
          src={url}
          alt={url}
          fallbackSrc={url}
          />
    </VStack>
    
  )
}


/**
 * @desc THE MAIN PAGE
 */
const Top = () => {
    const [recipes, setRecipes] = useState<RecipeItem[]>([])
    const [info, setInfo] = useState<InfoItem[]>([])
    const isMobile = useBreakpointValue({ base: true, md: false })
    useEffect(() => {
        (async () => {
            const { data } = await getGraphqlClient.query({
                query: gql`
                  {
                    recipeBookCollection(order:sys_publishedAt_DESC, limit:3) {
                        items {
                            sys {
                              id
                              publishedAt
                            }
                            thumbnail {
                              url
                            }
                            title
                            content {
                              json
                            }
                        }
                    }
                    informationCollection(order:sys_publishedAt_DESC, limit:3) {
                      items {
                        sys {
                          id
                          publishedAt
                        }
                        tag
                        title
                        description {
                          json
                        }
                      }
                    }
                  }
                `,
            });
            setInfo(data.informationCollection.items)
            setRecipes(data.recipeBookCollection.items)
        })()
    }, [])
    const topEl = [
      info.length > 0 && <Information infoItems={info}/>,
      <AboutSection key={1} />,
      <Point key={2} />,
      <LineUp key={3} />,
      <HowTo key={4} />,
      // <Hero2 key={5} />,
      // recipes.length > 0 &&  <Recipe recipes={recipes}/>,
      // <Media key={6} />,
      <FinalSection key={7} /> ,
    ]
  return (
    <Layout>
      <Hero />
      {topEl.map((el, i) => <Box key={i}>{el}</Box>)}
    </Layout>
  )
}


export default Top

EntryPoint(
  <ChakraProvider theme={theme}>
    <Top />
  </ChakraProvider>
);

