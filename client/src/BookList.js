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
  const books = data ? console.log(data.books) : null

  if (loading){
    return(
      <h1>Loading</h1>
    )
  }
  else{
    return data.books.map( book => <li>{book.name}</li>)
  }
  // return(
  //   <div>
  //     <ul id="book-list">
  //       <li>Book Name</li>
  //     </ul>
  //   </div>
  // )
}

export default BookList
