const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,       //allows querying with integer, even if id is a string like in dummy data below. typeof this is actually a js str
  GraphQLInt,
  GraphQLList
} = graphql;      //destructuring, grabs GraphQLString... from graphql package. must be these var names.

//dummy data
const books = [
  {name: 'A Dance With Dragons', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'A Game of Thrones', genre: 'Fantasy', id: '4', authorId: '1'},
  {name: 'Watchmen', genre: 'Fantasy', id: '2' , authorId: '2'},
  {name: 'GDC', genre: 'Xianxia', id: '3' , authorId: '3'}
]

const authors =  [
  {name: 'George RR Martin', age: 71, id:"1"},
  {name: 'Alan Moore', age: 66, id:"2"},
  {name: 'MXTX', age: 28, id:"3"},
]

const BookType = new GraphQLObjectType({    //define new object type
  name: 'Book',
  fields: () => ({   //wrap in fn, otherwise app will crash trying to reference AuthorType that is not defined yet
    id: { type: GraphQLID },
    name: { type: GraphQLString },    //must use GraphQL types
    genre: { type: GraphQLString },
    author: {                   //finding associated author
      type: AuthorType,
      resolve(parent, args){    //used to query some data object, used in rootquery and for assc objs
        // console.log(parent, args)       //appears in terminal, not browser
        return authors.find( author => author.id === parent.authorId)     //parent is Book originally queried
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),    //return a list of objects (author has many books)
      resolve(parent, args){
        return books.filter( book => book.authorId === parent.id)
      }
    }
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
    },
    author:{
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return authors.find( author => author.id === args.id )
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields:{
    addAuthor:{
      type: AuthorType,
      args:{
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        // author.save((err) => { if (err) return handleError(err) })
        //error handling?
})
        return author.save()
      }
    },
    addBook:{
      type: BookType,
      args:{
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          age: args.age
          //author = Author.find_or_create_by(args.authorId)
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
