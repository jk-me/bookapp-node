const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,       //allows querying with integer, even if id is a string like in dummy data below. typeof this is actually a js str
  GraphQLInt
} = graphql;
//destructuring, grabs GraphQLString... from graphql package. must be these var names.

//dummy data
const books = [
  {name: 'A Dance With Dragons', genre: 'Fantasy', id: '1'},
  {name: 'Watchmen', genre: 'Fantasy', id: '2'},
  {name: 'GDC', genre: 'Xianxia', id: '3'}
]

const BookType = new GraphQLObjectType({    //define new object type
  name: 'Book',
  fields: () => ({   //wrap in fn so objects can interact/reference each other better
    id: { type: GraphQLID },
    name: { type: GraphQLString },    //must use GraphQLString, not string
    genre: { type: GraphQLString }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({   //used to jump into graph to query
  name: "RootQueryType",
  fields:{
    book:{
      type: BookType,
      args:{ id:{ type: GraphQLID }},  //expected arg when querying, ex query: book(id:"123"){name} ->retrieve name of book 123
      resolve(parent, args){ //parent refers to a relationship, args refers to prev line
        //fires when queried, will have access to args.id in this case
        //code to get data from db/other source
        return books.find( book => book.id === args.id )
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
