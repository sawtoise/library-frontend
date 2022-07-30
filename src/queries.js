import { gql } from "@apollo/client/core";

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    id
  }
}`

export const ALL_GENRES = gql`
query {
  allBooks {
    genres
  }
}`

export const ALL_BOOKS_BY_GENRE = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    id
  }
}`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author {
      name
    }
    id
    genres
  }
}`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      bookCount
      born
    }
  }`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CURRENT_USER = gql`
query {
  me {
    username
    favouriteGenre
    id
  }
}`
