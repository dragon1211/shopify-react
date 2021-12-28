import { 
    Box,
    Flex,
    HStack, 
    Text,
 } from '@chakra-ui/layout'
import React, { FC } from 'react'
import GoTopIcon from './icons/GoTopIcon'
import { Link } from 'react-scroll'
import FooterIcon from './icons/footerIcon'


interface FooterItem {
    label: string;
    href: string;
}
interface FooterMenu {
    parent: FooterItem
    children: FooterItem[]
}
const SP_NAV = [
    {label:"商品一覧", href:"/collections/all"},
    {label:"ママの休食について", href:"/pages/about"},
    // {label:"お得な会員制度", href:""},
    {label:"ギフトのご案内", href:"/pages/gift"},
    {label:"よくあるご質問", href:"/apps/help-center"},
    // {label:"お問い合わせ", href:""},
]


const FOOTER_ITEMS: FooterItem[] = [
    {label: '利用規約', href: "/policies/terms-of-service"},
    {label: '特定商取引法に基づく表記', href: "/policies/legal-notice"},
    {label: 'プライバシーポリシー', href: "/policies/privacy-policy"},
]
// TODO: UNCOMMENT THE MENU BELOW WHEN WE RELEASED ALL THE FEATURE
const DESKTOP_NAV: FooterMenu[] = [
    {
        parent: {label:"商品一覧", href:"/collections/all"},
        children: [
            {label:"全てのカテゴリ", href:"/collections/all"},
            {label:"お弁当", href:"/products/obento"},
            {label:"お惣菜", href:"/products/osouzai"},
            {label:"スイーツ", href:"/products/donut"},
            {label:"サプリメント", href:"/products/yousan"},
            {label:"ギフト", href:"/products/gift"},
        ],
    },
    {
        parent: {label:"こだわりを知る", href:""},
        children: [
            {label:"ママの休食について", href:"/pages/about"},
            // {label:"お客様の声", href:""},
            // {label:"お弁当へのこだわり", href:""},
            // {label:"お惣菜へのこだわり", href:""},
            {label:"ギフトのご案内", href:"/pages/gift"},
        ],
    },
    // {
    //     parent: {label:"メニューを見る", href:""},
    //     children: [
    //         {label:"メニュー紹介", href:""},
    //     ],
    // },
    // {
    //     parent: {label:"お知らせ", href:"/pages/informations"},
    //     children: [
    //         {label:"新着情報", href:""},
    //     ],
    // },
    // {
    //     parent: {label:"スペシャルコンテンツ", href:""},
    //     children: [
    //         {label:"アレンジレシピ", href:""},
    //     ],
    // },
    {
        parent: {label:"ご利用ガイド", href:"/policies/terms-of-service"},
        children: [
            {label:"よくあるご質問", href:"/apps/help-center"},
            // {label:"お得な会員制度", href:""},
            // {label:"お問い合わせ", href:""},
        ],
    },
]


const FooterContainer:FC = ({children}) => 
    <Box
        width={{md:"970px", base:"100%"}}
        px="30px"
    >
        {children}
    </Box>

const MobileNav = () => 
    <HStack 
        display={{md:"none", base:"block"}}  
        pt={{md: "50px", base:"0px"}}
        spacing={{md:24, base:0}}>
        {SP_NAV.map((n,i) =>
            <Box key={i} w={{md:"fit-content", base:"100%"}} _notLast={{pb:"40px"}}>
                <Text display="block" as={'a'} href={n.href} fontWeight={600} fontFamily={"Yu Gothic Pr6N D,sans-serif"}>{n.label}</Text>
            </Box>
        )}
    </HStack>

const DesktopNav = () => 
    <Box display={{md:"flex", base:"none"}} pt={{md: "50px", base:"60px"}} spacing={{md:24, base:0}} flexWrap="wrap" 
        // TODO: FULL releaseの時space-betweenにする
        // justifyContent={{lg:"center"　, base:"flex-start"}} align="flex-start"  >
        justifyContent="flex-start" align="flex-start"  >
        {DESKTOP_NAV.map((f, i) => 
            <Box key={i} pb="40px" w="fit-content" 
            _notLast={{mr:"54px"}}
            // TODO: FULL releaseの時にこのマージンをなくす
            >
                <Text display={"block"} mb="17px" fontSize={"15px"} fontWeight={600} fontFamily={"Yu Gothic Pr6N D,sans-serif"}>
                    {f.parent.label}
                </Text>
                {f.children.map((c,j) => 
                    <Text display="block" w="fit-content" key={j} as="a" href={c.href} fontSize={"13px"} mb="7px">
                        {c.label}
                    </Text>
                )}
            </Box>
        )}
    </Box>



function Footer() {
    return (
        <footer>
            <Flex
                bg="#F0F0F0"
                position="relative"
                py="60px"
                justifyContent={"center"}
            >
                <FooterContainer>
                    <Box display={{md:"block", base:"none"}} as="a" href="/">
                        <FooterIcon />
                    </Box>
                    <Box display={{md:"none", base:"block"}} position="absolute" right="30px" top="60px">
                        <Link activeClass="active"
                            to="top"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-100}
                            duration={500}
                            isDynamic={true}
                            >
                            <GoTopIcon />
                        </Link>
                    </Box>
                    <MobileNav />
                    <DesktopNav />
                    <HStack pt={{md: "100px", base:"60px"}} flexWrap="wrap" justifyContent="center" alignItems="center" spacing="none">
                        {FOOTER_ITEMS.map((g,j) => 
                            <Flex key={j} w="fit-content" alignItems={"center"}>
                                <Text as={'a'} href={g.href} w={{md:"fit-content", base:"100%"}} fontSize={"13px"} fontWeight={600} fontFamily={"Yu Gothic Pr6N D,sans-serif"}>{g.label}</Text>
                                {(FOOTER_ITEMS.length-1) !== j && 
                                <Box mx="10px">
                                    |
                                </Box>}
                            </Flex>
                        )}
                    </HStack>
                    <Text pt={{md:"30px", base:"24px"}} textAlign="center" variant="primary" fontFamily={"'nort', sans-serif"}>
                        &copy;2021 MAMA NO KYUSHOKU
                    </Text>
                </FooterContainer>
            </Flex>
        </footer>
    )
}

export default Footer
