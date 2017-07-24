
//////////////////////////////////////////////////////////////////////////
/////////////////  Component Renders List of Books     //////////////////
/////////////////          server side db             ///////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import { Link }               from 'react-router-dom'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import sortBy                 from 'sort-by'

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
  componentDidUpdate() {

  }

  render() {
    const { books, onUpdateBook } = this.props
    const { query } = this.state

    let showingBooks

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.name))

    }
    else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('shelf'))

    return (
      <div className='list-books'>
        {/*<div className='list-books-top'> */}
          {/* <div className="search-books"> */}
           <div className="search-books-bar">
              <input
                className='search-books'
                type='text'
                placeholder='Search your private library by title or author'
                value={this.state.query}
                onChange={ (event) => this.updateQuery(event.target.value)}
              />
           </div>
        {/*  </div> */}
      {/*  </div> */}

      <ol className="books-grid">
        {showingBooks.map((book) => (

        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128,
                                                   height: 193,
                                                   backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
              </div>

              <div className="book-shelf-changer">
                <select>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>

            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>
          </div>
        </li>
        ))}
      </ol>

    </div>
    )
  }
}
export default ListBooks
