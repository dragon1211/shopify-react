import { Button } from '@chakra-ui/button'
import { ArrowBackIcon, ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/layout'
import React, { FC, useEffect, useState } from 'react'
import {Fade} from 'react-reveal'
import ProgressBar from './progressBar'
import { 
    Text,
  } from "@chakra-ui/react"

export interface StepConfigProps  {
    label?: JSX.Element | string
    content: JSX.Element | string
}


interface Props {
    steps: StepConfigProps[]
}

const Stepper:FC<Props> = ({steps}) => {
    const [currStep, setCurrStep]= useState(0)
    const [isNext, setIsNext]= useState(true)
    return (
        <Box 
            w={{base:"350px", md:"750px"}} 
            px={{base:"16px", md:"42px"}}
            bg="white"
            borderRadius="10px"
            my={{base:"50px", md:"100px"}}
            pt={{base:"24px", md:"44px"}}
            >
            <Box textAlign="center">
                <Button variant="outline" px="40px" fontWeight="normal" mb={{base:"0px",md:"20px"}}>
                    {currStep + 1} of {steps.length}
                </Button>
                <ProgressBar display={{base: "none", md:"inherit"}} progressvalue={currStep/(steps.length - 1) * 100} color="#EB6860" />
            </Box>
            {steps.map((s,i) => 
                i === currStep && 
                    <Step key={i} isNext={isNext}>
                        <Box
                            pt={{base:"10px", md:"44px"}}
                            pb={{base:"80px", md:"80px"}}
                            textAlign={{base:"start", md:"center"}}
                        >
                            {s.content}
                            <Flex position="absolute" bottom="0"  left ="0" w="100%" pb="5">
                                {currStep !== 0 && 
                                    <Button variant="primary" mr="10px" borderRadius="full" onClick={() => {
                                        setCurrStep(currStep-1)
                                        setIsNext(false)
                                    }}>
                                        <ArrowBackIcon /> 前へ
                                    </Button>
                                }
                                {currStep !== steps.length -1 &&
                                    <Button ml="auto" variant="primary" borderRadius="full" onClick={() => {
                                        setCurrStep(currStep+1)
                                        setIsNext(true)
                                    }}>
                                        次へ <ArrowForwardIcon />
                                    </Button>
                                }
                                {currStep === steps.length -1 &&
                                    <Button ml="auto" variant="primary" borderRadius="full" onClick={() => {
                                        console.log("add product to cart");
                                    }}>
                                        カートに追加する 
                                    </Button>
                                }
                            </Flex>
                        </Box>
                    </Step>
            )}
        </Box>
    )
}

export default Stepper

interface StepProps {
    isNext: boolean
}
  
const Step:FC<StepProps> = ({isNext, children}) => {
    const distance = "600px"
    return (
      isNext 
        ? <Fade right distance={distance} duration={400}>
            {children}
          </Fade>
        : <Fade left distance={distance} duration={400}>
            {children}
          </Fade>
    )
}
  