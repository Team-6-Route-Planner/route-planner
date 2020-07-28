const { gql } = require("apollo-server");
const axios = require("axios");
const baseUrl = process.env.USER_PATH;

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    deviceToken: String
    lat: Float
    lng: Float
    status: Boolean
  }
  extend type Query {
    getAvailables: [User]
    getUser(id: ID): User
    getAllUser: [User]
  }
  extend type Mutation {
    register(username: String, password: String): User
    login(username: String, password: String, deviceToken: String): User
    updateLocation(userId: String, lat: Float, lng: Float): User
  }
`;

const resolvers = {
  Query: {
    getAvailables: () => {
      return axios({
        method: "get",
        url: `${baseUrl}/availables`,
      }).then(({ data }) => {
        return data;
      });
    },
    getUser: (_, args) => {
      const { id } = args;
      return axios({
        method: "get",
        url: `${baseUrl}/${id}`,
      }).then(({ data }) => {
        return data;
      });
    },
    getAllUser: () => {
      return axios({
        method: "get",
        url: `${baseUrl}/all`,
      }).then(({ data }) => {
        return data;
      });
    },
  },
  Mutation: {
    register: (_, args) => {
      const { username, password } = args;
      return axios({
        method: "post",
        url: `${baseUrl}/register`,
        data: { username, password },
      }).then(({ data }) => {
        return data;
      });
    },
    login: (_, args) => {
      const { username, password, deviceToken } = args;
      // console.log(deviceToken)
      return axios({
        method: "post",
        url: `${baseUrl}/login`,
        data: { username, password, deviceToken },
      }).then(({ data }) => {
        return data;
      });
    },
    updateLocation: (_, args) => {
      const { userId, lat, lng } = args;
      return axios({
        method: "put",
        url: `${baseUrl}/${userId}`,
        data: { lat, lng },
      }).then(({ data }) => {
        return data;
      });
    },
  },
};
module.exports = { typeDefs, resolvers };
