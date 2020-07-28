import { gql } from "@apollo/client";

export const FETCH_USERS = gql`
  query {
    getAvailables {
      _id
      username
    }
  }
`;

export const FETCH_POSITION = gql`
  query($userId: ID) {
    getUser(id: $userId) {
      _id
      lat
      lng
      username
      status
    }
  }
`;

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

export const FETCH_All_USER = gql`
  query {
    getAllUser {
      _id
      username
      status
      lat
      lng
    }
  }
`;

export const GET_HISTORY = gql`
  query($userId: String) {
    getHistory(userId: $userId) {
      _id
      userId
      status
      startedAt
      routes {
        address
        lat
        lng
        _id
        arrivedAt
        status
      }
    }
  }
`;
