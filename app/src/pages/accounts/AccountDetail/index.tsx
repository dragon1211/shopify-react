import React, { FC, useEffect, useMemo, useState } from "react";
import { 
  ChakraProvider, 
  Button,
  Box,
  Spinner,
} from "@chakra-ui/react"
import { EntryPoint } from "../../../components/EntryPoint";
import{Layout}from "../../../components/layout";
import Orders from "../../../components/orders";
import Subscriptions from "../../../components/subscriptions";
import theme from "../../../styles/theme";


const Context = () => {
  const cid = useMemo(() => {
    return (window as any).__st.cid;
  }, []);
  return <div>{cid}</div>;
};

export interface AuthProps {customerId: string, token: string}

const Component = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [subs, setSubs] = useState<any[]>([])
  const [auth, setAuth] = useState<AuthProps>({customerId: '', token: ''})
  useEffect(() => {
    const orders = (window as any).orders
    const address = (window as any).address
    setEmail((window as any).email)
    console.log((window as any).email, orders, address);
    
    (async () => {
      setLoading(true)
      const token = await fetch('/apps/floor-s').then(res=>res.text()).then(html=>new DOMParser().parseFromString(html,'text/html')).then(dom=>dom.getElementById('customerIdHash').textContent);
      const customerId = (window as any ).__st.cid;
      const sellingPlans = await fetch(`/apps/floor-s/api/v1/subscriptions?customerId=${customerId}&token=${token}`,{headers: {'Content-Type': "application/json"}}).then(res=>res.json());
      const sps = sellingPlans.map(s => ({id: parseInt(s.sellingPlanName), ...s}))
      const subs = []
      await Promise.all(sps.map(async sp => {
        const {id, status} = sp
        const plan = await fetch(`/apps/floor-s/api/v1/subscriptions/${id}?customerId=${customerId}&token=${token}`,{headers: {'Content-Type': "application/json"}}).then(res=>res.json());
        subs.push({...sp, ...plan})
      }))
      setOrders((window as any).orders)
      console.log(subs);
      setAuth({customerId, token})
      setSubs(subs)
      setLoading(false)
    })()
  }, [])
  return (
    <Layout>
      <Box p="10" m="10">
        {loading && <Spinner /> }
        <Subscriptions subscriptions={subs} auth={auth} email={email}/>
      </Box>
    </Layout>
  )
}

EntryPoint(
  <ChakraProvider theme={theme}>
    <Component />
    <Context />
  </ChakraProvider>
);
