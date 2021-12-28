import { Button, ButtonProps } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import React from 'react'

function BackButton(props: ButtonProps) {
    return (
        <Button {...props} onClick={() => history.back()} variant="accent" borderRadius="full" border="solid 1px #EB6860" mb="16px" >
            <ArrowBackIcon />
        </Button>       
    )
}

export default BackButton
