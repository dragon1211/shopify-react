import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
  } from "@apollo/client";
  import { setContext } from '@apollo/client/link/context';
  
  const httpLink = createHttpLink({
    uri: 'https://mwsfrm6ym3.execute-api.ap-northeast-1.amazonaws.com/dev/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      }
    }
  });
  
  export const getGraphqlClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });