
const express = require('express');
require('dotenv').config();
const colors = require('colors');
const {connectDB} = require("./config/db");
const port = process.env.port || 8000;
const app = express();
const cors = require('cors');
const schema = require("./schema/schema");


const { graphqlHTTP } = require("express-graphql");

app.use(cors());
connectDB();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV==='development',
}))

app.listen(port, console.log(`server is running: ${port}`));