import {ApolloClient, InMemoryCache, makeVar} from '@apollo/client'

const myUser = makeVar({
  "id": 1,
  "name": "Bambang Wokya"
})

export const myTrips = makeVar([])

const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        user:{
          read(){
            return myUser()
          }
        },
        trips:{
          read(){
            return myTrips()
          }
        }
      }
    }
  }
})

const client  = new ApolloClient({
  uri: 'http://localhost:3000',
  cache
})

export default client;

