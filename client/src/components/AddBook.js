import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const AddBook = () =>{

  const {data, loading} = useQuery(getBooksQuery)
  console.log(data)
  const books = data ? console.log(data.books) : null

  if (loading){
    return(
      <h1>Loading</h1>
    )
  }
  else{
    return (
      <div>
        <ul id="book-list">
          {data.books.map( book => <li key={book.id}>{book.name}</li>)}
        </ul>
      </div>
    )
  }
  // return(
  //
  // )
}

export default AddBook
