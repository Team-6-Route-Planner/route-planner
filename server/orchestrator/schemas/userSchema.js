const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = process.env.USER_PATH;

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        token: String
    }
    extend type Query {
        getAvailables : [User]
    }
    extend type Mutation {
        register(username: String, password: String): User
        login(username: String, password: String): User
    }
`;

const resolvers = {
    Query: {
        getAvailables: () => {
            return axios({
                method: 'get',
                url: `${baseUrl}/availables`
            })
            .then(({ data }) => {
                return data;
            })
        }
    },
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