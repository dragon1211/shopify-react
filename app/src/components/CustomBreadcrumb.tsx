import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'

interface Props {
    crumbs: {name: string, href: string}[]
}

function CustomBreadcrumb(props: Props) {
    const {crumbs} = props

    return (
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />} color="#EB6860" position="relative" zIndex={2} pb={{base:"20px", md:"40px"}}>
        {crumbs.map((c, i) =>
          <BreadcrumbItem key={i}>
            <BreadcrumbLink href={c.href}>{c.name}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb> 
    )
}

export default CustomBreadcrumb
