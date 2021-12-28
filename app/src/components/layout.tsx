import { 
    Box,
    Container,
    ContainerProps,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FC } from 'react'
import Navbar from './navbar'
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/footer';
import CustomBreadcrumb from './CustomBreadcrumb';


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
    title: string | JSX.Element;
    crumbs: {name:string, href: string}[];
    containerProps?: ContainerProps;
}
const PageLayout: FC<PageProps> = ({title, crumbs, children, containerProps}) => {
    return (
        <Layout>
            <Container maxW={'7xl'} 
                pt={{md:"140px", base:"140px"}}
                pb={{md:"140px", base:"0"}}
                {...containerProps}
                px="30px"
            >
                <VStack>
                    <Box w="100%" maxW={{base:"100%", md:"960px"}}>
                        <CustomBreadcrumb crumbs={crumbs} />
                        {
                            typeof title === 'string' 
                            ? <Text variant="pageTitle" pb={{base:"24px", md:"40px"}}>
                                {title}
                            </Text>
                            : <>{title}</>
                        }
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