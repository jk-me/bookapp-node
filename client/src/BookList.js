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

  const {data} = useQuery(getBooksQuery)
  const books = data ? console.log(data.books) : null
  return(
    <div>
      <ul id="book-list">
        <li>Book Name</li>
      </ul>
    </div>
  )
}

export default BookList
