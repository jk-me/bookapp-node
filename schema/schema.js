const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;
//destructuring, grabs GraphQLString... from graphql package. must be these var names.

const BookType = new GraphQLObjectType({    //define new object type
  name: 'Book',
  fields: () => ({   //wrap in fn so objects can interact/reference each other better
    id: { type: GraphQLString },    //must use GraphQLString, not string
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields:{
    book:{
      type: BookType,
      args:{ id:{ type: GraphQLString }},  //expected arg when querying, ex query: book(id:"123"){name} ->retrieve name of book 123
      resolve(parent, args){ //parent refers to a relationship, args refers to prev line
        //fires when queried, will have access to args.id in this case
        //code to get data from db or other source
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
