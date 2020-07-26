const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = process.env.TRIP_PATH;

const typeDefs = gql`
    type Route {
        lat: Float
        lng: Float
        address: String	
    }
    type Trip {
        _id: ID
        routes: [Route]
        status: Boolean
        userId: String
    }
    extend type Query {
        getCurrentTrip(userId: String): Trip
        getHistory(userId: String): [Trip]
    }
    extend type Mutation {
        addTrip(addresses: [String], userId: String) : Trip
        editTrip(_id: ID, status: Boolean): Trip
    }
`;

const resolvers = {
    Query: {
        getCurrentTrip: (_, args) => {
            const { userId } = args;
            return axios({
                method: 'get',
                url: `${baseUrl}/${userId}`
            })
            .then(({ data }) => {
                return data;
            })
            .catch(console.log);
        },
        getHistory: (_, args) => {
            console.log('masuk getHistory')
            const { userId } = args;
            return axios({
                method: 'get',
                url: `${baseUrl}/${userId}/history`
            })
            .then(({ data }) => {
                return data;
            })
        }
    },
    Mutation: {
        addTrip: (_, args) => {
            const { addresses, userId } = args;
            return axios({
                method: 'post',
                url: baseUrl,
                data: { addresses, userId }
            })
            .then(({ data }) => {
                return data;
            })
            .catch(console.log);
        },
        editTrip: (_, args) => {
            const { _id, status } = args;
            return axios({
                method: 'put',
                url: `${baseUrl}/${_id}`,
                data: { status }
            })
            .then(({ data }) => {
                return data.value;
            })
            .catch(console.log);
        }
    }
}
module.exports = { typeDefs, resolvers }