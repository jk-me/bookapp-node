const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const Author = require('./models/author.js')


const app = express();
const port = 4000;
//allow cors
app.use(cors());

//copy connect str from mongodb proj site, subst name and pw mongo-jk,ukghJCiUymue01e1
//add options object for deprecated services
mongoose
  .connect(
    "mongodb+srv://mongo-jk:ukghJCiUymue01e1@node-gql-pract-vdd94.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Error: ", err.message));

//replaced by then/catch above
// mongoose.connection.once('open', () => {
//   console.log('connected to database')
// })

app.get("/", function(req, res) {
  res.send("Hello backend");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.post('/ping', function(req, res, next) {
  console.log('pinged')
  res.status(200).send('Added')
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
