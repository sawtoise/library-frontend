import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_BY_GENRE, ALL_AUTHORS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setGenre] = useState("")

  const resultBooks = useQuery(ALL_BOOKS)
  const resultGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    variables: { genre: selectedGenre.genre },
  })

  const genreResult = useQuery(ALL_GENRES)

  
 
  if (!props.show || resultBooks.loading || genreResult.loading || resultGenre.loading) {
    return null
  }

  let books = null

  if (selectedGenre === "") {
    books = resultBooks.data.allBooks
  } else {
    books = resultGenre.data.allBooks
  }

  const genres = genreResult.data.allBooks

  const genreSet = new Set()
  genres.map((entry) => entry.genres.map((genre) => genreSet.add(genre)))
  const genreList = Array.from(genreSet)



  return (
    <div>
      <h2>books</h2>
      {selectedGenre && <span>in genre <strong>{selectedGenre.genre}</strong></span>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genreList.map((genre) => (
          <button onClick={() => setGenre({genre})} key={genre}>{genre}</button>
        ))}
        <button onClick={() => setGenre("")} >all genres</button>

      </div>
    </div>
  )
}

export default Books
