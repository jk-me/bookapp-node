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

  const {books} = useQuery(getBooksQuery)
  console.log(books)
  return(
    <div>
      <ul id="book-list">
        <li>Book Name</li>
      </ul>
    </div>
  )
}

export default BookList
