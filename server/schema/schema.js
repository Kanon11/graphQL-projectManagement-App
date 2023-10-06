// let { projects, clients } = require("../sampleData");
// mongose model
const project = require("../models/project")
const client = require("../models/client")
const {
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLObjectType


} = require('graphql');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => {
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            status: { type: GraphQLString },
            client: {
                type: ClientType,
                resolve(parent, args) {
                    return clients.find((client)=>{return client.id===parent.clientId})
                }
            }
        }
    }
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return project.find();
            }
        }, project: {
            type: ProjectType,
            args: { id:{ type: GraphQLID }},
            resolve(parent, args) {
                return project.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return project.findById(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})