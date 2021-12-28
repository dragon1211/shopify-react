import { Box, Circle } from "@chakra-ui/react";
import React, { FC, memo } from "react";

interface Props {
  width?: string;
  height?: string;
  viewBox?: string;
  color?: string;
  cartItemCount?: number;
  primary?: string;
}

const CartIcon: FC<Props> = memo(
  ({
    width = "22.035",
    height = "22.362",
    viewBox = "0 0 22.035 22.362",
    color = "#665b51",
    primary = "#eb6860",
    cartItemCount,
  }) => {
    return (
      <Box pos="relative">
        <div data-cart-count-bubble className={cartItemCount > 0 ? "" : "hide"}>
          <Circle
            pos="absolute"
            top="-8px"
            right="-8px"
            size="16px"
            ringColor={color}
            border={color}
            borderWidth="1px"
            background={primary}
            color="#FFF"
            fontSize="8px"
          >
            <span data-cart-count>{cartItemCount}</span>
          </Circle>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="cart"
          width={width}
          height={height}
          viewBox={viewBox}
        >
          <path
            id="Path_721"
            data-name="Path 721"
            d="M247.432,176.635H236.448a1.543,1.543,0,0,1-1.511-1.243l-2.756-14.03a.935.935,0,0,0-.657-.72l-3.157-.924a.522.522,0,0,1,.294-1l3.157.924a1.977,1.977,0,0,1,1.388,1.521l2.757,14.03a.5.5,0,0,0,.485.4h10.984a.522.522,0,0,1,0,1.044Z"
            transform="translate(-227.992 -158.694)"
            fill={color}
          />
          <path
            id="Path_722"
            data-name="Path 722"
            d="M246.879,173.449H236.023a1.869,1.869,0,0,1-1.83-1.506l-1.488-7.569a1.866,1.866,0,0,1,2.035-2.215l13.547,1.486a1.867,1.867,0,0,1,1.627,2.217l-1.2,6.083A1.87,1.87,0,0,1,246.879,173.449Zm-12.346-10.256a.82.82,0,0,0-.8.979l1.487,7.569a.822.822,0,0,0,.805.663h10.856a.822.822,0,0,0,.805-.662l1.2-6.083a.821.821,0,0,0-.716-.976L234.626,163.2h0A.714.714,0,0,0,234.533,163.193Z"
            transform="translate(-227.913 -158.636)"
            fill={color}
          />
          <path
            id="Path_723"
            data-name="Path 723"
            d="M246.784,168.384H236.332a.523.523,0,0,1,0-1.045h10.452a.523.523,0,1,1,0,1.045Z"
            transform="translate(-227.86 -158.548)"
            fill={color}
          />
          <path
            id="Path_724"
            data-name="Path 724"
            d="M241.347,173.208a.522.522,0,0,1-.523-.523v-8.839a.522.522,0,0,1,1.044,0v8.839A.522.522,0,0,1,241.347,173.208Z"
            transform="translate(-227.775 -158.616)"
            fill={color}
          />
          <path
            id="Path_725"
            data-name="Path 725"
            d="M245.456,173.195a.522.522,0,0,1-.522-.523v-8.056a.522.522,0,1,1,1.044,0v8.056A.523.523,0,0,1,245.456,173.195Z"
            transform="translate(-227.705 -158.603)"
            fill={color}
          />
          <path
            id="Path_726"
            data-name="Path 726"
            d="M237.237,173.216a.523.523,0,0,1-.523-.523V163.32a.523.523,0,1,1,1.045,0v9.374A.523.523,0,0,1,237.237,173.216Z"
            transform="translate(-227.844 -158.625)"
            fill={color}
          />
          <ellipse
            id="Ellipse_41"
            data-name="Ellipse 41"
            cx="1.567"
            cy="1.567"
            rx="1.567"
            ry="1.567"
            transform="translate(7.491 19.228)"
            fill={color}
          />
          <ellipse
            id="Ellipse_42"
            data-name="Ellipse 42"
            cx="1.567"
            cy="1.567"
            rx="1.567"
            ry="1.567"
            transform="translate(16.183 19.228)"
            fill={color}
          />
        </svg>
      </Box>
    );
  }
);

export default CartIcon;
