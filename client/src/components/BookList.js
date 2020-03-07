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

const BookList = () =>{

  const {data, loading} = useQuery(getBooksQuery)
  console.log(data)
  // const books = data ? console.log(data.books) : null

  const displayBooks = () =>{
    return loading ? <li>Loading</li> : data.books.map( book => <li key={book.id}>{book.name}</li>)
  }

  return(
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
    </div>
  )

}

export default BookList
