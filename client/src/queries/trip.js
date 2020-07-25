import { gql } from '@apollo/client'

export const FETCH_USERS = gql`
  query {
    users {
      _id
      username
    }
  }
`;

export const ADD_TRIP = gql`
	mutation ($addresses: [String], $userId: String) {
    addTrip(addresses: $addresses, userId: $userId) {
      _id
      userId
      status
    }
  }
`