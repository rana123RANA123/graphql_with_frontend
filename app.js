// const express = require('express')
// const mongoose = require("mongoose")
// const cors = require("cors")
// const { ApolloServer } = require("apollo-server")


// require("dotenv").config()

// const typeDefs = require('./graphql/typeDefs')
// const resolvers = require('./graphql/resolvers')

// const server = new ApolloServer(
//     typeDefs,
//     resolvers,
// )

// const mongoDB = process.env.CONNECTION_STRING || "your_fallback_connection_string";

// mongoose.connect(mongoDB, {
//     useNewParser: true,
//     useUnifiedTopology: true,
//     tls: true,
//     tlsAllowInvalidCertificates: true,
// })

//     .then(() => {
//         console.log("Mongodb connected")
//         return server.listen({ port: process.env.PORT || 8000 })
//     }).then((res) => [
//         console.log(`server running at ${res.url}`)
//     ]).catch((error) => {
//         console.log("Mongodb Connection Error", error)
//     })

// const db = mongoose.connection;

// db.on("error", (error) => {
//     console.error("Mongodb Error", error)
// })

// db.once("open", () => {
//     console.log("Mongodb connected successfully")
// })






const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server');

require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const mongoDB = process.env.CONNECTION_STRING || 'your_fallback_connection_string';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
})
    .then(() => {
        console.log('Mongodb connected');
        return server.listen({ port: process.env.PORT || 8000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((error) => {
        console.log('Mongodb Connection Error', error);
    });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Mongodb Error', error);
});

db.once('open', () => {
    console.log('Mongodb connected successfully');
});
