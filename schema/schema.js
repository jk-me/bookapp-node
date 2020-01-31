const graphql = require('graphql');
const Author = require('../models/author.js')
const Book = require('../models/book.js')

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,       //allows querying with integer, even if id is a string like in dummy data below. typeof this is actually a js str
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull    //requires input in mutation/query
} = graphql;      //destructuring, grabs GraphQLString... from graphql package. must be these var names.



//dummy data
// const books = [
//   {name: 'A Dance With Dragons', genre: 'Fantasy', id: '1', authorId: '1'},
//   {name: 'A Game of Thrones', genre: 'Fantasy', id: '4', authorId: '1'},
//   {name: 'Watchmen', genre: 'Fantasy', id: '2' , authorId: '2'},
//   {name: 'GDC', genre: 'Xianxia', id: '3' , authorId: '3'}
// ]
//
// const authors =  [
//   {name: 'George RR Martin', age: 71, id:"1"},
//   {name: 'Alan Moore', age: 66, id:"2"},
//   {name: 'MXTX', age: 28, id:"3"},
// ]

const BookType = new GraphQLObjectType({    //define new object type
  name: 'Book',
  fields: () => ({   //wrap in fn, otherwise app will crash trying to reference AuthorType that is not defined yet
    id: { type: GraphQLID },
    name: { type: GraphQLString },    //must use GraphQL types
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){    //used to query some data object(s), here parent is Book originally queried

        // console.log(parent, args)       //appears in terminal, not browser
        // return authors.find( author => author.id === parent.authorId)  //dummy data example

        return Author.findById(parent.authorId)     //Author model required at top, used to interact w mongodb
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
      type: new GraphQLList(BookType),    //author has many books, so need to return a list of objects
      resolve(parent, args){
        // return books.filter( book => book.authorId === parent.id)   //dummy data example w filter
        return Book.find({authorId: parent.id})   //pass an object, find method returns those that match property
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
      resolve(parent, args){ //args from prev line
        //code to get data from db/other source
        return Book.findById(args.id)
      }
    },
    author:{
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // return authors.find( author => author.id === args.id )
        return Author.findById(args.id)
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({})  //when passing an empty obj, find method returns all objects
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({  //remember to require model files at top and add mutation to exports at btm
  name: "Mutation",
  fields:{
    addAuthor:{
      type: AuthorType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({   //use required db model
          name: args.name,
          age: args.age
        })
        // author.save((err) => { if (err) return handleError(err) })
        //error handling?
        return author.save()
      }
    },
    addBook:{
      type: BookType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          author: args.authorId
        })
        return book.save()
      }
    },
    editAuthor:{
      type: AuthorType,
      args:{
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parent, args){
        //resolve
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
