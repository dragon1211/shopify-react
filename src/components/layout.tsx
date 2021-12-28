import { 
    Box,
    Container,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FC } from 'react'
import Navbar from './navbar'
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/footer';


const Layout: FC = ({children}) => {
    return (
        <>
            <Navbar />
            <section id="top"></section>
            {children}
            <Footer />
        </>
    )
}

export interface PageProps {
    title: string;
}
const PageLayout: FC<PageProps> = ({title, children}) => {
    return (
        <Layout>
            <Container maxW={'7xl'} 
                pt={{md:"140px", base:"140px"}}
                pb={{md:"140px", base:"0"}}
                px="30px"
            >
                <VStack>
                    <Box w="100%" maxW={{base:"100%", md:"960px"}}>
                        <Text variant="pageTitle" pb={{base:"24px", md:"40px"}}>
                            {title}
                        </Text>
                        {children}
                    </Box>
                </VStack>
            </Container>
        </Layout>
    )
}


export {
    Layout,
    PageLayout
}