import { render } from "react-dom";
import React, { FC, useState } from 'react'
import { Button } from '@chakra-ui/button';
import { 
    Box,
    Text,
} from '@chakra-ui/layout';
import { AuthProps } from '../pages/accounts/AccountDetail';
import { 
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react"
import { getGraphqlClient } from '../utils/gqlClient';
import SurveyForm from "./surveyForm";
import { gql } from "@apollo/client";

interface Props {
  email: string;
  auth: AuthProps;
  subscriptions: any[];
}

const Subscriptions: FC<Props> = ({subscriptions, auth, email}) => {
  const changeHandler = async(e) => {
    const contractId = '2106032303' // TODO: remember to change this contractId to be dynamic
    const url = `https://mamakyu-proto1.myshopify.com/apps/floor-s/api/v1/subscriptions/${contractId}/lines`
    const id = e.substring(e.lastIndexOf('/') + 1)
    await fetch(`${url}/${id}?customerId=${auth.customerId}&token=${auth.token}`, {
      method: 'DELETE'
    })
    await fetch(`${url}?customerId=${auth.customerId}&token=${auth.token}`, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        "productVariantId": "gid://shopify/ProductVariant/40653792444591", // TODO remember to set this to be dynamic tooo
        "quantity": 1,
      })
    })
  }
  const churnHandler = async (contractId: number) => {
    const url = `https://mamakyu-proto1.myshopify.com/apps/floor-s/api/v1/churn`
    await fetch(`${url}?customerId=${auth.customerId}&token=${auth.token}`, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        contractId: `gid://shopify/SubscriptionContract/${contractId}` // TODO remember to set this to be dynamic too
      })
    })
  }
  const pauseHandler = async (contractId: number) => {
    const url = `https://mamakyu-proto1.myshopify.com/apps/floor-s/api/v1/pause`
    await fetch(`${url}?customerId=${auth.customerId}&token=${auth.token}`, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        contractId: `gid://shopify/SubscriptionContract/${contractId}` // TODO remember to set this to be dynamic too
      })
    })
  }
  const continueHandler = async (contractId: number) => {
    try {
      const url = `https://mamakyu-proto1.myshopify.com/apps/floor-s/api/v1/resume`
      await fetch(`${url}?customerId=${auth.customerId}&token=${auth.token}`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          contractId: `gid://shopify/SubscriptionContract/${contractId}`
        })
      })
    } catch (error) {
      return alert(JSON.stringify(error))
    }
  }
  return (
    <Box>
      <Text fontSize="1.5em">注文履歴</Text>
      
      {<Box p="10" m="10" shadow="xl" borderRadius="2xl">
          {subscriptions.map((s,i) => 
            <Box key={i} p="10" m="10" shadow="l" borderRadius="2xl">
              {JSON.stringify(s.status)}
              {JSON.stringify(s.customerId)}
              {JSON.stringify(s.sellingPlanName)}
              <Box>
                <OpenSurvey type="SUBSCRIPTION_CANCELED" customerId={s.customerId} contractId={s.id} resolver={() => churnHandler(s.id)} email={email}>
                  churn 解約
                </OpenSurvey>
                <OpenSurvey type="SUBSCRIPTION_PAUSED" customerId={s.customerId} contractId={s.id} resolver={() => pauseHandler(s.id)} email={email}>
                  paused 一時停止
                </OpenSurvey>
                <Button onClick={() => continueHandler(s.id)}>
                  continue 再開
                </Button>
              </Box>

              {s.lines.edges.map((e, j) => 
                <Box key={i} p="10" m="10" shadow="l" borderRadius="2xl">
                  <Text key={i+j}>
                    {JSON.stringify(e.node.id)}
                    <Button onClick={() => changeHandler(e.node.id)}>
                      change
                    </Button>
                  </Text>
                  {/* gid://shopify/SubscriptionLine/9c49ebbd-88e1-409b-9ed8-4d9c7bdba8ff */}
                </Box>
              )}
            </Box>
          )}    
        </Box>
      }    
    </Box>
  )
}
export default Subscriptions



/**
 * @description : the survey form
 */
interface SurveyProps {
  email: string
  customerId: string
  contractId: string
  type: 'SUBSCRIPTION_CANCELED' | 'SUBSCRIPTION_PAUSED'
  resolver: () => void
}
const OpenSurvey: FC<SurveyProps> = ({email, customerId, contractId, type, resolver, children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const submitHandler = async({reason}) => {
    const { data } = await getGraphqlClient.mutate({
      variables: {
        customerId,
        contractId: `gid://shopify/SubscriptionContract/${contractId}`,
        email,
        type,
        reason,
      },
      mutation: gql`
        mutation PostSurveyMutation($customerId: String!, $contractId: String!, $email: String!, $type: String!, $reason: String!) {
          postSurvey(customerId: $customerId, contractId: $contractId, email: $email, type: $type, reason: $reason) {
            code
            success
            message
            body {
              updatedRange
            }
          }
        }      
      `,
    });
    if (data.postSurvey.code === 200) { 
      await resolver()
    }
    onClose()
  }

  return (
    <>
      <Button variant="primary" onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>解約理由</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SurveyForm submitHandler={submitHandler}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
