const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require ("mongoose")

const app = express()

//copy connect str from mongodb proj site, subst name and pw mongo-jk,ukghJCiUymue01e1
//add options object for deprecated services
mongoose.connect('mongodb+srv://mongo-jk:ukghJCiUymue01e1@node-gql-pract-vdd94.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Error: ", err.message));

//replaced by then/catch above
// mongoose.connection.once('open', () => {
//   console.log('connected to database')
// })

app.get('/', function (req, res) {
  res.send('Hello Worrrrld!!!!!!!!!!');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
