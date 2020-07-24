import { gql } from '@apollo/client'

export const ADD_TRIP = gql`
	mutation AddTrip($data: TripInput) {
    addTrip(trip: $data) {
      _id
      addresses
    }
  }
`