import { 
    Box,
    Flex,
    HStack, 
    Stack,
    Text,
 } from '@chakra-ui/layout'
import React from 'react'
import GoTopIcon from './icons/GoTopIcon'
import Logo from './icons/logo'
import { Link } from 'react-scroll'

interface Props {}

function Footer(props: Props) {
    const scrollTop = () => {

    }
    return (
        <footer>
            <Stack 
                bg="#F0F0F0"
                px={{md:"160px", base: "30px"}}
                position="relative"
                py="60px"
            >
                <Logo />
                <Box display={{md:"none", base:"block"}} position="absolute" right="30px" top="160px" onClick={() => scrollTop()}>
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
                    
                <HStack pt={{md: "50px", base:"60px"}} spacing={{md:24, base:0}} flexWrap="wrap" justify="flex-start" align="flex-start">
                    {FOOTER_MENUS.map((f, i) => 
                    <Box key={i} w={{md:"fit-content", base:"100%"}} pb="40px">
                        {f.group.map((g,j) => <Text display="block" key={j} as={'a'} href={g.href}>{g.label}</Text>)}
                    </Box>
                    )}
                </HStack>
                <HStack pt={{md: "100px", base:"50px"}} flexWrap="wrap" justify="flex-start" align="flex-start" spacing="none">
                    {FOOTER_ITEMS.map((g,j) => 
                        <Flex key={j} w={{md:"fit-content", base:"100%"}}>
                            <Text as={'a'} href={g.href} w={{md:"fit-content", base:"100%"}} color="#686868">{g.label}</Text>
                            {(FOOTER_ITEMS.length-1) !== j && <Box display={{md: "block", base: "none"}} mx="10px">
                                |
                            </Box>}
                        </Flex>
                    )}
                </HStack>
                <Text pt={{md:"30px", base:"60px"}} textAlign={{md: "start", base:"center" }} variant="primary">
                    &copy;2021 MAMA NO KYUSHOKU
                </Text>
            </Stack>
        </footer>
    )
}

export default Footer

interface FooterItem {
    label: string;
    href: string;
}
interface FooterMenu {
    group: FooterItem[]
  }
const FOOTER_MENUS: FooterMenu[] = [
    {
        group: [
            {label:"商品について", href:""},
            {label:"メニュー紹介", href:""},
        ],
    },
    {
        group: [
            {label:"ご利用ガイド", href:""},
            {label:"FAQ", href:""},
        ],
    },
    {
        group: [
            {label:"新着情報", href:""},
            {label:"お知らせ", href:""},
        ],
    },
    {
        group: [
            {label:"購入する", href:""},
            {label:"お弁当セット", href:""},
            {label:"サプリメント", href:""},
        ],
    },
]


const FOOTER_ITEMS: FooterItem[] = [
    {label: 'お問合せ', href: ""},
    {label: '利用規約', href: ""},
    {label: '特定商取引法に基づく表記', href: ""},
    {label: 'プライバシーポリシー', href: ""},
]