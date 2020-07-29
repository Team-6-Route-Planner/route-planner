import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://54.251.83.170:4000/",
  cache: new InMemoryCache(),
});

export default client;