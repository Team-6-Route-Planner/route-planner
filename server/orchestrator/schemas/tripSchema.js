const { gql } = require("apollo-server");
const axios = require("axios");
const baseUrl = process.env.TRIP_PATH;
const routeUrl = process.env.ROUTE_PATH;

const typeDefs = gql`
    type Route {
        _id: ID
        status: String
        arrivedAt: String
        lat: Float
        lng: Float
        address: String	
    }
    type Trip {
        _id: ID
        routes: [Route]
        status: Boolean
        userId: String
        startedAt: String
    }
    extend type Query {
        getCurrentTrip(userId: String): Trip
        getOneTrip(tripId: String): Trip
        getHistory(userId: String): [Trip]
    }
    extend type Mutation {
        addTrip(addresses: [String], userId: String) : Trip
        editTrip(_id: ID, status: Boolean): Trip
        editRoute(
            userId: String,
            routeId: String,
            status: String,
            arrivedAt: String) : Trip
    }
`;

const resolvers = {
    Query: {
        getCurrentTrip: (_, args) => {
            const { userId } = args;
            return axios({
                method: 'get',
                url: `${baseUrl}/${userId}/current`
            })
            .then(({ data }) => {
                return data;
            })
            .catch(console.log);
        },
        getOneTrip: (_, args) => {
            const { tripId } = args;
            return axios({
                method: 'get',
                url: `${baseUrl}/${tripId}`
            })
            .then(({ data }) => {
                return data;
            })
            .catch(console.log);
        },
        getHistory: (_, args) => {
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
            console.log(_id)
            return axios({
                method: 'put',
                url: `${baseUrl}/${_id}`,
                data: { status }
            })
            .then(({ data }) => {
                return data;
            })
            .catch(console.log);
        },
        editRoute: (_, args) => {
            const { userId, routeId, status, arrivedAt} = args;
            return axios({
                method: 'put',
                url: `${routeUrl}/${userId}/${routeId}`,
                data: { status, arrivedAt }
            })
            .then(({ data }) => {
                return data;
            })
        }
    }
}
module.exports = { typeDefs, resolvers }
