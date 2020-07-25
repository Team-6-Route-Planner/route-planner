import { gql } from '@apollo/client'

export const ADD_TRIP = gql`
	mutation AddTrip($trip: TripInput) {
    addTrip(trip: $trip) {
      _id
      addresses
    }
  }
`