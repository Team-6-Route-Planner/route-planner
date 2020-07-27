const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = process.env.USER_PATH;

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        token: String
    }
    extend type Mutation {
        register(username: String, password: String): User
        login(username: String, password: String): User
    }
`;

const resolvers = {
    Mutation: {
        register: (_, args) => {
            const { username, password } = args;
            return axios({
                method: 'post',
                url: `${baseUrl}/register`,
                data: { username, password }
            })
            .then(({ data }) => {
                return data;
            })
        },
        login: (_, args) => {
            const { username, password } = args;
            return axios({
                method: 'post',
                url: `${baseUrl}/login`,
                data: { username, password }
            })
            .then(({ data }) => {
                return data;
            })
        }
    }
}
module.exports = { typeDefs, resolvers }