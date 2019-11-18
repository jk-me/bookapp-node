const express = require("express")
const graphqlHTTP = require("express-graphql")

const app = express()

app.get('/', function (req, res) {
  res.send('Hello Worrrrld!!!!!!!!!!');
});

app.use('/graphql', graphqlHTTP({
  
}))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
