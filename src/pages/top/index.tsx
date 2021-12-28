import React, { useEffect, useState, FC } from "react";
import { 
  ChakraProvider, 
  Box,
  Button,
  HStack,
  ButtonProps,
  Container,
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
import AboutBgImage from "../../components/images/top/aboutBgImage";
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
import { fmt, parse } from "../../utils/dateUtils";
import PrimaryButton from "../../components/primaryButton";

interface RedDotProps extends BoxProps {
  leftVal: number
}
const RedDot:FC<RedDotProps> = (props) => {
  const size = useBreakpointValue({md:"9px", base:"6px"})
  const top = useBreakpointValue({md:"-6px", base:"-4px"})
  return <Box {...props} as="span" pos="absolute"  borderRadius="full" bg="#EB6860" h={size}  w={size} top={top} left={{base: `${props.leftVal / 1.63}px`, md: `${props.leftVal}px`}}  _before={{
    content:'" "'
  }} />
}

const TitleBox :FC<BoxProps> = (props) => {
  const {children} = props
  const boxProps = props
  // delete boxProps.children
  return <Box {...boxProps} fontSize={{base:"25px", md:"40px"}} letterSpacing=".15em" color="#493E34" lineHeight={{base:"1.84em",md:"1.75em"}}>{children}</Box>}
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
        <TitleBox h="40vh" justifyContent="center" display="flex" alignItems="center" flexDirection="column">
          <Text>
            ママの休食は、
          </Text>
          <Text>
            ママやご家族の
          </Text>
          <Text pos="relative">
            健<RedDot leftVal={20}/>康<RedDot leftVal={63}/>を応<RedDot leftVal={157}/>援<RedDot leftVal={202}/>する
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
  <Box px={{base:"30px", md:"40px"}}>
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
          <Text variant="primary" fontSize={{base: '50px', md: '50px'}} whiteSpace="nowrap">
              {title}
          </Text>
          <Text fontSize={{base: '16px', md: '16px'}} pb="12px"　ml={{base:"0px", md: "20px"}} letterSpacing=".2em">
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
              ママに休<RedDot leftVal={161} />養<RedDot leftVal={202} />と
            </Text>
            <Text pos="relative">
              栄<RedDot leftVal={16} />養<RedDot leftVal={63} />を届けます
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
          maxWidth={{base:"343px", md:"500px"}}
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
  title: string
  description: string
  boxProps?: BoxProps
}
const PointItem:FC<PropsItem> = ({pic, icon, title, description, boxProps}) => (
  <Box position="relative" {...boxProps}>
    <Flex align="flex-end" marginBottom="-1.5em" zIndex="2" position="relative">
      {icon}
      <Text ml="1em" w="200px" fontSize="18px" lineHeight="32px">
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
            <Flex flexWrap="wrap" justify={{base:"center", md:"flex-start"}} mb="90px">
                <PointItem pic={<FirstPic />} title="栄養バランスにこだわったお弁当やおかずをお届け" description="ママの休食独自の栄養価基準を元に、管理栄養士がレシピを作成しています。" icon={<FirstIcon />} boxProps={{
                  mr: {base:"0px", md:"60px"},
                  mb:"40px"
                }} />
                <PointItem pic={<SecondPic />} title="ご家庭の家事の負担軽減をお手伝い" description="商品は温めるだけの簡単調理メニューや、気軽に取り入れられるサプリ。忙しい日の味方です。" icon={<SecondIcon />} boxProps={{
                  mr: {base:"0px", md:"60px"},
                  mb:"40px"
                }} />
                <PointItem pic={<ThirdPic />} title="おいしくて安心安全ご家族の健康も守ります" description="ご家族全員で楽しんでいただけるラインナップ。食材の産地や鮮度もこだわり抜いています。" icon={<ThirdIcon />} />
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
    <Box w={{base:"100%", md:"280px"}} h={{base:"570px", md:"550px"}} position="relative" mb={{base: "80px", md:"60px"}} mr={{base: "0px", md:"60px"}}>
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
      >
        {title}
      </Text>
      <Text
        mb={{base:"24px", md:"40px"}}
        fontSize="16px"
        lineHeight="24px"
      >
        {desc}
      </Text>
      <Box alignItems="flex-end" position="absolute" bottom="0px" right="0px">
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
      width={{base: "100%",md:"90%"}}
      borderTopRightRadius={{base:"50px", md:"200px"}}
      >
        <Box px={{base:"30px", md:"40px"}}  w="100vw">
          <VStack>
              <Box w={{base: "100%", xl: "1200px"}} position="relative" pl={{base: "0", md: "8em"}}>
                {children}
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
    <>
      <ContainerSection>
        {/* <TopTitle title="INFORMATION" subtitle="新着情報"/> */}
        <TopTitle title="RELEASE" subtitle="機能リリース情報"/>
      </ContainerSection>
      {/* <GalleryLayout buttonUrl="/pages/informations"> */}
      <GalleryLayout>
        <Box mt="50px" mb="30px">
          {infoItems.map((info,i) => 
            <Box display={{base:"inherit", md: "flex"}} key={i}  bg="white" _hover={{opacity:.5}} px="20px" py="10px" mb="10px" as={'a'} href={`/pages/information-details?id=${info.sys.id}`} pos="relative" >
              <Text mr="10px">
              {fmt(parse(info.sys.publishedAt), "yyyy.MM.dd")}
              </Text>
              <Text 
                  w={{base:"90%"}}
                  // overflow="hidden"
                  // textOverflow="ellipsis"
                  // whiteSpace="nowrap"
                >
                {info.title}
              </Text>
              {/* <TriangleRightIcon alignSelf="center" color="#EB6860" flexGrow={1} display="flex" justifyContent="flex-end" /> */}
              <TriangleRightIcon pos="absolute" right="1em" bottom="1em" />
            </Box>
          )}
        </Box>
      </GalleryLayout>
    </>
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path id="Path_295" data-name="Path 295" d="M536.667,7201.163a20.237,20.237,0,0,0,16.667,19.888v-14.445h-5v-5.555h5v-4.445c0-5,3.221-7.776,7.778-7.776a30.1,30.1,0,0,1,4.443.443v5.112H563c-2.445,0-3,1.221-3,2.778v3.888h5.334l-.889,5.555H560v14.445a20.129,20.129,0,1,0-23.333-19.888Z" transform="translate(-536.667 -7181.051)" fill="#eb6860" fillRule="evenodd"/></svg>,
      url: '',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="36.667" height="36.667" viewBox="0 0 36.667 36.667"><path id="Path_296" data-name="Path 296" d="M651.514,7193.034a2.227,2.227,0,1,0-1.562.608A2.232,2.232,0,0,0,651.514,7193.034Zm-18.177,1.357a9.424,9.424,0,1,1-2.76,6.663A9.428,9.428,0,0,1,633.337,7194.391Zm4.322,12.315a6.115,6.115,0,1,0-2.191-1.544A6.117,6.117,0,0,0,637.659,7206.706Zm9.75-20.575c-1.934-.088-2.514-.107-7.409-.107s-5.475.019-7.408.107a10.134,10.134,0,0,0-3.4.632,6.053,6.053,0,0,0-3.478,3.478,10.132,10.132,0,0,0-.632,3.4c-.088,1.933-.107,2.513-.107,7.408s.019,5.475.107,7.409a10.135,10.135,0,0,0,.632,3.405,6.057,6.057,0,0,0,3.478,3.478,10.138,10.138,0,0,0,3.4.632c1.933.088,2.512.106,7.408.106s5.475-.018,7.409-.106a10.138,10.138,0,0,0,3.405-.632,6.057,6.057,0,0,0,3.478-3.478,10.136,10.136,0,0,0,.632-3.405c.088-1.934.106-2.514.106-7.409s-.018-5.475-.106-7.408a10.133,10.133,0,0,0-.632-3.4,6.053,6.053,0,0,0-3.478-3.478A10.135,10.135,0,0,0,647.409,7186.131Zm-14.967-3.3c1.955-.09,2.578-.11,7.558-.11s5.6.022,7.557.11a13.463,13.463,0,0,1,4.453.852,9.377,9.377,0,0,1,5.36,5.361,13.468,13.468,0,0,1,.854,4.45c.09,1.959.11,2.582.11,7.56s-.022,5.6-.11,7.559a13.441,13.441,0,0,1-.854,4.45,9.355,9.355,0,0,1-5.36,5.361,13.454,13.454,0,0,1-4.45.854c-1.956.09-2.58.11-7.56.11s-5.6-.022-7.558-.11a13.434,13.434,0,0,1-4.45-.854,9.366,9.366,0,0,1-5.363-5.36,13.518,13.518,0,0,1-.852-4.45c-.09-1.958-.11-2.581-.11-7.56s.022-5.6.11-7.556a13.476,13.476,0,0,1,.852-4.454,9.39,9.39,0,0,1,5.361-5.361,13.515,13.515,0,0,1,4.45-.852Z" transform="translate(-621.667 -7182.721)" fill="#eb6860" fillRule="evenodd"/></svg>,
      url: '',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="35" height="33.336" viewBox="0 0 35 33.336"><path id="Path_297" data-name="Path 297" d="M738.334,7198.59c0-7.832-7.857-14.207-17.5-14.207s-17.5,6.375-17.5,14.207c0,7.019,6.226,12.9,14.634,14.014.57.119,1.344.377,1.544.861a3.585,3.585,0,0,1,.057,1.578l-.239,1.487c-.069.438-.354,1.727,1.527.94s10.088-5.946,13.762-10.175A12.574,12.574,0,0,0,738.334,7198.59Zm-24.347,4.662h-3.482a.925.925,0,0,1-.923-.918v-6.956a.921.921,0,1,1,1.841,0v6.038h2.564a.918.918,0,0,1,0,1.836Zm3.595-.918a.917.917,0,1,1-1.834,0v-6.956a.918.918,0,1,1,1.835,0Zm8.374,0a.925.925,0,0,1-.923.917.924.924,0,0,1-.747-.365l-3.561-4.842v4.289a.917.917,0,0,1-1.835,0v-6.956a.927.927,0,0,1,.627-.871.836.836,0,0,1,.284-.047.951.951,0,0,1,.723.371l3.589,4.853v-4.306a.921.921,0,1,1,1.841,0Zm5.615-4.4a.916.916,0,0,1,.879.561.925.925,0,0,1-.207,1.022.919.919,0,0,1-.31.2.932.932,0,0,1-.362.061h-2.558v1.64h2.558a.932.932,0,0,1,.365.057.921.921,0,0,1,.524.5.911.911,0,0,1,0,.724.921.921,0,0,1-.889.556H728.1a.918.918,0,0,1-.915-.918v-6.956a.92.92,0,0,1,.915-.922h3.482a.92.92,0,0,1-.006,1.839h-2.558v1.641Z" transform="translate(-703.334 -7184.383)" fill="#eb6860"/></svg>,
      url: '',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="37.843" height="30.764" viewBox="0 0 37.843 30.764"><path id="Path_294" data-name="Path 294" d="M491.667,7189.318a15.527,15.527,0,0,1-4.458,1.222,7.782,7.782,0,0,0,3.413-4.3,15.519,15.519,0,0,1-4.93,1.884,7.767,7.767,0,0,0-13.23,7.083,22.048,22.048,0,0,1-16-8.113,7.77,7.77,0,0,0,2.4,10.366,7.751,7.751,0,0,1-3.517-.971v.1a7.769,7.769,0,0,0,6.229,7.613,7.808,7.808,0,0,1-3.507.133,7.766,7.766,0,0,0,7.253,5.39,15.681,15.681,0,0,1-11.5,3.217,21.953,21.953,0,0,0,11.9,3.488c14.283,0,22.091-11.83,22.091-22.09,0-.333-.008-.67-.023-1a15.765,15.765,0,0,0,3.872-4.017Z" transform="translate(-453.824 -7185.669)" fill="#eb6860"/></svg>,
      url: '',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="33.333" height="33.541" viewBox="0 0 33.333 33.541"><path id="Path_293" data-name="Path 293" d="M786.905,7214.228v-16.77h7.738a1.792,1.792,0,0,0,1.786-1.8v-7.786H813.1v26.353Zm5.953-26.063v5.7h-5.664Zm-9.524,5.99v20.073a3.583,3.583,0,0,0,3.571,3.594H813.1a3.583,3.583,0,0,0,3.571-3.594v-26.353a3.583,3.583,0,0,0-3.571-3.594h-19.95a3.561,3.561,0,0,0-2.525,1.053l-6.241,6.28A3.605,3.605,0,0,0,783.334,7194.155Z" transform="translate(-783.334 -7184.281)" fill="#eb6860"/></svg>,
      url: '',
    },
  ]
  return(
    <VStack alignItems="center">
        <Box pt={{base:"100px", md:"300px"}} >
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="25" viewBox="0 0 128 25">
            <text id="Follow_us_" data-name="Follow us !" transform="translate(64 19)" fill="#eb6860" fontSize="25" fontFamily="Helvetica" letterSpacing="0.03em"><tspan x="-63.491" y="0">Follow us !</tspan></text>
          </svg>
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

