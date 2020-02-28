import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

import BookList from './BookList.js'

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

function App() {
  return (
    //wrap w ApolloProvider and add set up ApolloClient
    <ApolloProvider client={client}>
      <div className="App">
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
