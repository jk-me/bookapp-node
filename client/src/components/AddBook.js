import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

const getAuthorsQuery = gql`{
    authors{
      name
      id
    }
  }`

const AddBook = () =>{

  const {data, loading} = useQuery(getAuthorsQuery)
  console.log(data)
  // const authors = data ? console.log(data.authors) : null

  const displayAuthors = () =>{
     if (loading){
       return <option disabled>Loading..</option>
     }
     else{
       return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
     }
  }

  return(
    <form id="add-book">
      <div className="field">
        <label>Book Name: </label>
        <input type="text" />
      </div>

      <div>
        <label>Genre: </label>
        <input type="text" />
      </div>

      <div>
        <label>Author: </label>
        <select>
          <option>Select Author:</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )

}

export default AddBook
