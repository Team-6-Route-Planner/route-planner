if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
// const userSchema = require('./schemas/userSchema');
const tripSchema = require('./schemas/tripSchema');

const typeDefs = gql`
    type Query
    type Mutation
`;
const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        // userSchema.typeDefs,
        tripSchema.typeDefs,
    ],
    resolvers: [
        // userSchema.resolvers,
        tripSchema.resolvers,
    ],
});

const server = new ApolloServer({schema});
server.listen(process.env.PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});