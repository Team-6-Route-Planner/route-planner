import { gql } from "@apollo/client";

export const ADD_TRIP = gql`
  mutation($addresses: [String], $userId: String) {
    addTrip(addresses: $addresses, userId: $userId) {
      _id
      userId
      status
    }
  }
`;

export const DETAILS_TRIP = gql`
  query($userId: String) {
    getCurrentTrip(userId: $userId) {
      _id
      userId
      status
      routes {
        address
        lat
        lng
        _id
        arrivedAt
      }
    }
  }
`;
