import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'



const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
       <Notify errorMessage={errorMessage} /> 
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ?
          <button onClick={() => setPage('login')}>login</button> :
          <>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook setError={notify} show={page === 'add'} />

      <Recommended  show={page === 'recommend'} />

      <LoginForm setToken={setToken} setError={notify} show={page === 'login'} />
    </div>
  )
}

export default App
