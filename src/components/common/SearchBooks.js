
//////////////////////////////////////////////////////////////////////////
/////////////////         Search Public Library        //////////////////
/////////////////              Backend db              //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import DisplayShelf           from './DisplayShelf'
import * as BooksAPI          from '../../db/BooksAPI'

class SearchBooks extends Component {

  static propTypes = {
     onSelectBook: PropTypes.func.isRequired
   }

  state = {
     query: '',
     books: []
   }

  searchAllBooks = (q, max) => {
    BooksAPI.search(q, max).then((books) => {
      console.log({books: books})
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  selectedOption = (book, shelf) => {
      // update via parent component a book selected and associated shelf
      this.props.onSelectBook(book, shelf)
  }

  componentDidUpdate() {

  }

  render() {

    const { query } = this.state
    const { books } = this.state

    let showingBooks

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    }
    else {
      showingBooks = books
    }

    let none = showingBooks.filter((book) => {if (book.shelf === "none") return book})

    return (
      <div className='list-books'>
           <div className="search-books-bar">
              <input
                className='search-books'
                type='text'
                placeholder='Search the public library by title and author'
                value={this.state.query}
                onChange={ (event) => this.updateQuery(event.target.value)}
              />
           </div>

              <h5 className="bookshelf-title">Make a Selection</h5>
              <DisplayShelf showingBooks={none} selectedOption={this.selectedOption} />

    </div>
    )
  }
}
export default SearchBooks
