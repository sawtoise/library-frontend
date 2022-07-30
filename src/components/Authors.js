import { useQuery, useMutation   } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import  Select  from 'react-select'

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show || result.loading) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <UpdateForm authors = {authors.map(a => a.name)}></UpdateForm>
    </div>
  )
}

const UpdateForm = ({authors}) => {

  const options = authors.map((name) => ({  label: name, value: name }));

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({variables: {name: name.value, setBornTo: born}})
    setBorn('')
  }


  return (
    <div>
      <h2>edit year</h2>
      <form onSubmit={submit}>
        <Select 
        defaultValue
        onChange={setName} 
        options={options}>
        </Select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
