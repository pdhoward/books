
//////////////////////////////////////////////////////////////////////////
/////////////////  Component Renders List of Books     //////////////////
/////////////////          server side db             ///////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import DisplayShelf           from './DisplayShelf'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  selectedOption = (book, shelf) => {
      // call from displayshelf -- update the shelf property of book
      this.props.onUpdateBooks(book, shelf)
  }

  render() {

    const { books } = this.props
    const { query } = this.state

    let showingBooks

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    }
    else {
      showingBooks = books
    }

    let currentRead = showingBooks.filter((book) => {if (book.shelf === "currentlyReading") return book})
    let wantToRead = showingBooks.filter((book) => {if (book.shelf === "wantToRead") return book})
    let read = showingBooks.filter((book) => {if (book.shelf === "read") return book})

    return (
      <div className='list-books'>
           <div className="search-books-bar">
              <input
                className='search-books'
                type='text'
                placeholder='Search your private library by title'
                value={this.state.query}
                onChange={ (event) => this.updateQuery(event.target.value)}
              />
           </div>

              <h5 className="bookshelf-title">Currently Reading</h5>
              <DisplayShelf showingBooks={currentRead} selectedOption={this.selectedOption} />

              <h5 className="bookshelf-title">Want To Read</h5>
              <DisplayShelf showingBooks={wantToRead} selectedOption={this.selectedOption} />

              <h5 className="bookshelf-title">Read</h5>
              <DisplayShelf showingBooks={read} selectedOption={this.selectedOption} />
    </div>
    )
  }
}
export default ListBooks
