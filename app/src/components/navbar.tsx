import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  HStack,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Logo from "./icons/logo";
import CartIcon from "./icons/cartIcon";
import UserIcon from "./icons/userIcon";
import StrokeIcon from "./icons/strokeIcon";
import React, { useMemo } from "react";

interface Menu {
  title: string;
  url: string;
}

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const externalProps = useMemo(() => (window as any).Delta, []);

  return (
    <Box position="fixed" w="100%" bg="rgba(255,255,255, .9)" zIndex="4">
      <Flex
        minH={"72px"}
        px={{ md: "40px", base: "20px" }}
        borderBottom={1}
        align={"center"}
      >
        <Flex
          flex={1}
          justify="start"
          h="100%"
          align="center"
          as={"a"}
          href="/"
        >
          <Logo />
        </Flex>

        <Flex align="center" display={{ base: "none", lg: "flex" }}>
          <DesktopNav />
        </Flex>
        <Flex align="center" display={{ base: "flex", lg: "none" }}>
          <Box mr="15px" as="a" href="/account">
            <UserIcon />
          </Box>
          <Box mr="15px" as="a" href="/cart">
            <CartIcon cartItemCount={externalProps?.cartItemCount} />
          </Box>
          <IconButton
            variant="iconPrimary"
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  // const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const externalProps = useMemo(() => (window as any).Delta, []);

  return (
    <HStack spacing={8}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={600}
                fontFamily={"Yu Gothic Pr6N D,sans-serif"}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
      <StrokeIcon />
      <Box as="a" href="/account">
        <UserIcon />
      </Box>
      <Box as="a" href="/cart">
        <CartIcon cartItemCount={externalProps?.cartItemCount} />
      </Box>
    </HStack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      // _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            // _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Box
      px="25px"
      py={4}
      h="100vh"
      display={{ lg: "none" }}
    >
      {NAV_ITEMS.filter(m => !m.hiddenOnMobile).map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Divider />
      <MobileNavItem label="よくあるご質問" href="/apps/help-center" />
      <Box fontWeight="600" py={"60px"}>
        <Text variant="primary" fontFamily={"'nort', sans-serif"}>
          Follow us !
        </Text>
        <Flex mt="16px" alignItems="center">
          {sns.map((s, i) => (
            <Box key={i} as="a" href={s.url} mr="25px">
              {s.icon}
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box onClick={children && onToggle} py="20px">
      <Flex
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        _focus={{
          boxShadow: "none",
        }}
      >
        <Text fontWeight={600} fontFamily={"Yu Gothic Pr6N D,sans-serif"}>{label}</Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      {children && (
        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: "0 !important" }}
        >
          <Stack ml="5px" align={"start"} 
            mb="-40px"
            pt="20px"
            pb="30px"
            >
            {children.map((child) => (
              <Link key={child.label} py={0} href={child.href}>
                {child.label}
              </Link>
            ))}
          </Stack>
        </Collapse>
      )}
    </Box>
  );
};

interface NavItem {
  label: string;
  hiddenOnMobile?: boolean;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}
const NAV_ITEMS: Array<NavItem> = [
  {
    label: "商品一覧",
    children: [
      {
        label: "全てのカテゴリ",
        href: "/collections/all",
      },
      {
        label: "お弁当",
        // subLabel: 'お弁当好きなあなたに',
        href: "/products/obento",
      },
      {
        label: "お惣菜",
        href: "/products/osouzai",
      },
      {
        label: "スイーツ",
        href: "/products/donut",
      },
      {
        label: "サプリメント",
        href: "/products/yousan",
      },
      {
        label: "ギフト",
        href: "/products/gift",
      },
    ],
  },
  {
    label: "ママの休食について",
    href: "/pages/about",
  },
  {
    label: "ギフトのご案内",
    href: "/pages/gift",
  },
  {label:"よくあるご質問", href:"/apps/help-center", hiddenOnMobile: true},
];

const sns = [
  {
    // instagram
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.465 0.066C7.638 0.012 8.012 0 11 0C13.988 0 14.362 0.013 15.534 0.066C16.706 0.119 17.506 0.306 18.206 0.577C18.939 0.854 19.604 1.287 20.154 1.847C20.714 2.396 21.146 3.06 21.422 3.794C21.694 4.494 21.88 5.294 21.934 6.464C21.988 7.639 22 8.013 22 11C22 13.988 21.987 14.362 21.934 15.535C21.881 16.705 21.694 17.505 21.422 18.205C21.146 18.9391 20.7133 19.6042 20.154 20.154C19.604 20.714 18.939 21.146 18.206 21.422C17.506 21.694 16.706 21.88 15.536 21.934C14.362 21.988 13.988 22 11 22C8.012 22 7.638 21.987 6.465 21.934C5.295 21.881 4.495 21.694 3.795 21.422C3.06092 21.146 2.39582 20.7133 1.846 20.154C1.28638 19.6047 0.853315 18.9399 0.577 18.206C0.306 17.506 0.12 16.706 0.066 15.536C0.012 14.361 0 13.987 0 11C0 8.012 0.013 7.638 0.066 6.466C0.119 5.294 0.306 4.494 0.577 3.794C0.853723 3.06008 1.28712 2.39531 1.847 1.846C2.39604 1.2865 3.06047 0.853443 3.794 0.577C4.494 0.306 5.294 0.12 6.464 0.066H6.465ZM15.445 2.046C14.285 1.993 13.937 1.982 11 1.982C8.063 1.982 7.715 1.993 6.555 2.046C5.482 2.095 4.9 2.274 4.512 2.425C3.999 2.625 3.632 2.862 3.247 3.247C2.88205 3.60205 2.60118 4.03428 2.425 4.512C2.274 4.9 2.095 5.482 2.046 6.555C1.993 7.715 1.982 8.063 1.982 11C1.982 13.937 1.993 14.285 2.046 15.445C2.095 16.518 2.274 17.1 2.425 17.488C2.601 17.965 2.882 18.398 3.247 18.753C3.602 19.118 4.035 19.399 4.512 19.575C4.9 19.726 5.482 19.905 6.555 19.954C7.715 20.007 8.062 20.018 11 20.018C13.938 20.018 14.285 20.007 15.445 19.954C16.518 19.905 17.1 19.726 17.488 19.575C18.001 19.375 18.368 19.138 18.753 18.753C19.118 18.398 19.399 17.965 19.575 17.488C19.726 17.1 19.905 16.518 19.954 15.445C20.007 14.285 20.018 13.937 20.018 11C20.018 8.063 20.007 7.715 19.954 6.555C19.905 5.482 19.726 4.9 19.575 4.512C19.375 3.999 19.138 3.632 18.753 3.247C18.3979 2.88207 17.9657 2.60121 17.488 2.425C17.1 2.274 16.518 2.095 15.445 2.046ZM9.595 14.391C10.3797 14.7176 11.2534 14.7617 12.0669 14.5157C12.8805 14.2697 13.5834 13.7489 14.0556 13.0422C14.5278 12.3356 14.7401 11.4869 14.656 10.6411C14.572 9.79534 14.197 9.00497 13.595 8.405C13.2112 8.02148 12.7472 7.72781 12.2363 7.54515C11.7255 7.36248 11.1804 7.29536 10.6405 7.34862C10.1006 7.40187 9.57915 7.57418 9.1138 7.85313C8.64845 8.13208 8.25074 8.51074 7.9493 8.96185C7.64786 9.41296 7.45019 9.92529 7.37052 10.462C7.29084 10.9986 7.33115 11.5463 7.48854 12.0655C7.64593 12.5847 7.91648 13.0626 8.28072 13.4647C8.64496 13.8668 9.09382 14.1832 9.595 14.391ZM7.002 7.002C7.52702 6.47697 8.15032 6.0605 8.8363 5.77636C9.52228 5.49222 10.2575 5.34597 11 5.34597C11.7425 5.34597 12.4777 5.49222 13.1637 5.77636C13.8497 6.0605 14.473 6.47697 14.998 7.002C15.523 7.52702 15.9395 8.15032 16.2236 8.8363C16.5078 9.52228 16.654 10.2575 16.654 11C16.654 11.7425 16.5078 12.4777 16.2236 13.1637C15.9395 13.8497 15.523 14.473 14.998 14.998C13.9377 16.0583 12.4995 16.654 11 16.654C9.50046 16.654 8.06234 16.0583 7.002 14.998C5.94166 13.9377 5.34597 12.4995 5.34597 11C5.34597 9.50046 5.94166 8.06234 7.002 7.002ZM17.908 6.188C18.0381 6.06527 18.1423 5.91768 18.2143 5.75397C18.2863 5.59027 18.3248 5.41377 18.3274 5.23493C18.33 5.05609 18.2967 4.87855 18.2295 4.71281C18.1622 4.54707 18.0624 4.39651 17.936 4.27004C17.8095 4.14357 17.6589 4.04376 17.4932 3.97652C17.3275 3.90928 17.1499 3.87598 16.9711 3.87858C16.7922 3.88119 16.6157 3.91965 16.452 3.9917C16.2883 4.06374 16.1407 4.1679 16.018 4.298C15.7793 4.55103 15.6486 4.88712 15.6537 5.23493C15.6588 5.58274 15.7992 5.91488 16.0452 6.16084C16.2911 6.40681 16.6233 6.54723 16.9711 6.5523C17.3189 6.55737 17.655 6.42669 17.908 6.188Z"
          fill="#EB6860"
        />
      </svg>
    ),
    url: "https://www.instagram.com/mama9_2020/?hl=ja",
  },
  {
    // NOTE
    icon: (
      <svg
        width="20"
        height="23"
        viewBox="0 0 20 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_105_478)">
          <path
            d="M-9.04357e-07 7.36243L-1.95726e-06 19.4062C-2.06137e-06 20.5971 0.959373 21.5625 2.14286 21.5625L17.8571 21.5625C19.0406 21.5625 20 20.5971 20 19.4063L20 3.59429C20 2.40341 19.0406 1.43804 17.8571 1.43804L5.88759 1.43804C5.31927 1.43804 4.77423 1.66522 4.37237 2.0696L0.627633 5.83773C0.225768 6.24211 2.11741e-06 6.79055 -9.04357e-07 7.36243V7.36243ZM5.71429 3.76868L5.71429 7.18804L2.31616 7.18804L5.71429 3.76868ZM2.14286 19.4062L2.14286 9.34429L6.78571 9.34429C7.37746 9.34429 7.85714 8.8616 7.85714 8.26616L7.85714 3.59429L17.8571 3.59429L17.8571 19.4062L2.14286 19.4062Z"
            fill="#EB6860"
          />
        </g>
        <defs>
          <clipPath id="clip0_105_478">
            <rect
              width="20"
              height="23"
              fill="white"
              transform="translate(20 23) rotate(-180)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    url: "https://note.com/mama9",
  },
  {
    // TIKTOK
    icon: (
      <svg
        id="tiktok_logo_icon_144802"
        xmlns="http://www.w3.org/2000/svg"
        width="22.424"
        height="25.605"
        viewBox="0 0 22.424 25.605"
      >
        <path
          id="tiktok_logo_icon_144802-2"
          data-name="tiktok_logo_icon_144802"
          d="M13.883.022C15.291,0,16.69.013,18.088,0A6.619,6.619,0,0,0,19.97,4.451,7.625,7.625,0,0,0,24.529,6.36v4.3a11.5,11.5,0,0,1-4.517-1.033,13.1,13.1,0,0,1-1.743-.992c-.007,3.118.013,6.231-.02,9.336a8.06,8.06,0,0,1-7.81,7.627,7.874,7.874,0,0,1-4.385-1.1A8.034,8.034,0,0,1,2.13,18.4c-.026-.534-.035-1.067-.013-1.588a8.089,8.089,0,0,1,9.389-7.131c.022,1.58-.042,3.159-.042,4.74a3.773,3.773,0,0,0-3.246.4A3.7,3.7,0,0,0,6.75,16.688,4.209,4.209,0,0,0,6.6,18.4a3.68,3.68,0,0,0,6.742,1.347,2.5,2.5,0,0,0,.441-1.134c.106-1.908.064-3.809.077-5.717.009-4.3-.013-8.59.02-12.878Z"
          transform="translate(-2.105)"
          fill="#eb6860"
        />
      </svg>
    ),
    url: "https://www.tiktok.com/@mama9_official?lang=ja-JP",
  },
  {
    // FACEBOOK
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 12.067C0 18.033 4.333 22.994 10 24V15.333H7V12H10V9.333C10 6.333 11.933 4.667 14.667 4.667C15.533 4.667 16.467 4.8 17.333 4.933V8H15.8C14.333 8 14 8.733 14 9.667V12H17.2L16.667 15.333H14V24C19.667 22.994 24 18.034 24 12.067C24 5.43 18.6 0 12 0C5.4 0 0 5.43 0 12.067Z"
          fill="#EB6860"
        />
      </svg>
    ),
    url: "https://www.facebook.com/mamanokyushoku",
  },
  {
    // TWITTER
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.643 4.93708C22.808 5.30708 21.911 5.55708 20.968 5.67008C21.941 5.08787 22.669 4.17154 23.016 3.09208C22.1019 3.63507 21.1014 4.01727 20.058 4.22208C19.3564 3.47294 18.4271 2.9764 17.4143 2.80955C16.4016 2.6427 15.3621 2.81487 14.4572 3.29933C13.5524 3.78379 12.8328 4.55344 12.4102 5.48878C11.9875 6.42412 11.8855 7.47283 12.12 8.47208C10.2677 8.37907 8.45564 7.89763 6.80144 7.05898C5.14723 6.22034 3.68785 5.04324 2.51801 3.60408C2.11801 4.29408 1.88801 5.09408 1.88801 5.94608C1.88757 6.71307 2.07644 7.46832 2.43789 8.14481C2.79934 8.8213 3.32217 9.39812 3.96001 9.82408C3.22029 9.80054 2.49688 9.60066 1.85001 9.24108V9.30108C1.84994 10.3768 2.22204 11.4195 2.90319 12.2521C3.58434 13.0847 4.53258 13.656 5.58701 13.8691C4.9008 14.0548 4.18135 14.0821 3.48301 13.9491C3.78051 14.8747 4.36001 15.6841 5.14038 16.264C5.92075 16.8439 6.86293 17.1653 7.83501 17.1831C6.18485 18.4785 4.1469 19.1812 2.04901 19.1781C1.67739 19.1782 1.30609 19.1565 0.937012 19.1131C3.06649 20.4823 5.54535 21.2089 8.07701 21.2061C16.647 21.2061 21.332 14.1081 21.332 7.95208C21.332 7.75208 21.327 7.55008 21.318 7.35008C22.2293 6.69105 23.0159 5.87497 23.641 4.94008L23.643 4.93708V4.93708Z"
          fill="#EB6860"
        />
      </svg>
    ),
    url: "https://twitter.com/mamano9shoku",
  },
];
