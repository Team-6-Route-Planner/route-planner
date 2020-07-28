import {ApolloClient, InMemoryCache, makeVar} from '@apollo/client'

export const myUser = makeVar({
  // id: "5f1c46050480aa0638d44e62",
  // name: "Bambang"
})

export const myToken = makeVar(null)

export const myTrips = makeVar([])
export const myOngoingTrip = makeVar(null)

const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        token:{
          read(){
            return myToken()
          }
        },
        user:{
          read(){
            return myUser()
          }
        },
        trips:{
          read(){
            return myTrips()
          }
        },
        ongoingTrip:{
          read(){
            return myOngoingTrip()
          }
        }
      }
    }
  }
})

const client  = new ApolloClient({
  // uri: 'http://192.168.1.107:4000/',
  // uri: 'http://172.16.21.150:4000/',
  uri: 'http:192.168.100.13:4000/',
  cache
})

export default client;