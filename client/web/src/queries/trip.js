import { gql } from '@apollo/client'


export const FETCH_USERS = gql`
  query {
    getAvailables {
      _id
      username
    }
  }
`;

export const FETCH_POSITION = gql`
	query{
		getUser {
			_id
			lat
			lng
			username
			status
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