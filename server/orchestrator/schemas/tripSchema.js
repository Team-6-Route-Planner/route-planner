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
        getCurrentTrip(id: ID): Trip
    }
    extend type Mutation {
        addTrip(addresses: [String], userId: String) : Trip
    }
`;

const resolvers = {
    Query: {
        getCurrentTrip: (_, args) => {
            const { id } = args;
            return axios({
                method: 'get',
                url: `${baseUrl}/`
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
        }
    }
}
module.exports = { typeDefs, resolvers }