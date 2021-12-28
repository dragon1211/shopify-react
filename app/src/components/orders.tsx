import { 
    Box,
    Text,
} from '@chakra-ui/layout';
import React, { FC } from 'react'
import { render } from "react-dom";

interface Props {
  orders: any[];
}

const Orders: FC<Props> = ({orders}) => {
  return (
    <Box>
      <Text fontSize="1.5em">注文履歴</Text>
      
      {
        orders.map((o,i) => 
        <Box key={i} p="10" m="10" shadow="xl" borderRadius="2xl">
          <Box>
              <Text>
                注文日 {o.created_at},
              </Text>
              <Text>
                合計金額 {o.total}
              </Text>
              <Text>
                {o.fulfillment_status === 'unfulfilled' ? `配送予定日` : `配送完了` }
              </Text>
                {o.financial_status_label}
                {o.customer_url}
                {o.order_number}
                {o.created_at}
          </Box>
        </Box>
       )
      }     
    </Box>
  )
}
export default Orders
