import { useQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS_BY_GENRE } from '../queries'

const Recommended = (props) => {

  const currentUserResult = useQuery(CURRENT_USER)

  const resultGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: "Refactoring" },
  })

 
  if (!props.show || resultGenre.loading || currentUserResult.loading) {
    return null
  }

  const favouriteGenre = currentUserResult.data.me.favouriteGenre
  const books = resultGenre.data.allBooks


  return (
    <div>
      <h2>books</h2>
      {favouriteGenre && <span>books in your genre <strong>{favouriteGenre}</strong></span>}
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
    </div>
  )
}

export default Recommended
