import { Box, Button, ButtonProps } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import CartIcon from "./icons/cartIcon";
import TriangleRightIcon from "./icons/triangleRightIcon";

/**
 * @desc THE TOP MAIN BUTTON ALL SECTION
 */
 interface PrimaryButtonProps {
    title: string
    href?: string
    onClick?: () => void
    buttonProps?: ButtonProps
    disabled?: boolean
    rightIcon?: JSX.Element | string
  }
  const PrimaryButton: FC<PrimaryButtonProps> = ({title, href, buttonProps, onClick, rightIcon, disabled}) => {
      const [hoverColor, setHoverColor] = useState('white');
      if (!rightIcon) {
        rightIcon = <TriangleRightIcon mt="-2px" color={hoverColor} />   
      } else if(rightIcon === "cart" ) {
        rightIcon =  <Box mt="-5px"><CartIcon color={hoverColor} height="17px"  /></Box>
      }
    return (
        <Button variant="primaryTop" disabled={disabled} position="relative" {...buttonProps} onClick={onClick} onMouseEnter={() => setHoverColor('#EB6860')} onMouseLeave={() => setHoverColor('white')} rightIcon={rightIcon as JSX.Element} as={'a'} href={href}>
            {title}
        </Button>
    );
}

export default PrimaryButton