import { 
  Image,
  ListItem,
  Text,
  UnorderedList,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { getGraphqlClient } from '../utils/gqlClient';
import { gql } from '@apollo/client';
import {render} from 'react-dom'


interface Props {
    json: any
}

const CRender: FC<Props> = ({json}) => {
    const [src, setSrc] = useState('')
    const options = {
      renderText: text => {
        return text.split('\n').reduce((children, textSegment, index) => {
          return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
      },
      renderNode: {
        // [BLOCKS.PARAGRAPH]: (node) => {
        //   console.log(node.content[0].value);
        //   return <p>{node.content[0].value}</p>
        // },
        [BLOCKS.HEADING_1]: (node) => {
          return (
            <Box mt="10px">
              <Heading variant="h1">
                {node.content[0].value}
              </Heading>
            </Box>
          )
        },
        [BLOCKS.HEADING_2]: (node) => {
          return (
            <Box mt="10px">
              <Heading variant="h2" >
                {node.content[0].value}
              </Heading>
            </Box>
          )
        },
        [BLOCKS.HEADING_3]: (node) => {
          return (
            <Box mt="10px">
              <Heading variant="h3" >
                {node.content[0].value}
              </Heading>
            </Box>
          )
        },
        [BLOCKS.HEADING_4]: (node) => {
          return (
            <Box mt="10px">
              <Heading variant="h4" >
                {node.content[0].value}
              </Heading>
            </Box>
          )
        },
        [BLOCKS.HEADING_5]: (node) => {
          return (
            <Box mt="10px">
              <Heading variant="h5">
                {node.content[0].value}
              </Heading>
            </Box>
          )
        },
        [BLOCKS.HEADING_6]: (node) => {
          return (
            <Box mt="10px">
              <Heading variant="h6">
                {node.content[0].value}
              </Heading>
            </Box>
          )
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const {id } = node.data.target.sys;
          (async () => {
            const { data } = await getGraphqlClient.query({
              query: gql`
                query {
                  asset(id:"${id}") {
                    url
                  }
                }
              `,
            });
            setSrc(data.asset.url)
          })()
          return <Image src={src} fallbackSrc={src} alt={src} />
        },
        [INLINES.HYPERLINK]: (node, children) =>  <Text as={'a'} color="blue" href={node.data.uri}>{children}</Text>,
        [INLINES.ASSET_HYPERLINK]: (node, children) =>  <Text as={'a'} color="blue" href={node.data.uri}>{children}</Text>,
        [BLOCKS.UL_LIST]:(node, children) =>  <UnorderedList>{children}</UnorderedList>,
        [BLOCKS.LIST_ITEM]:(node, children) =>  <Flex>・<ListItem>{children}</ListItem></Flex>,
      }
    };
    return (
        <>
        {documentToReactComponents(json as any, options)}
        </>
    )
}

export default CRender