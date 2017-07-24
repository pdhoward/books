
//////////////////////////////////////////////////////////////////////////
/////////////////  Component Renders List of Books     //////////////////
/////////////////          server side db             ///////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import { Link }               from 'react-router-dom'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import sortBy                 from 'sort-by'
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
           <div className="search-books-bar">
              <input
                className='search-books'
                type='text'
                placeholder='Search your private library by title or author'
                value={this.state.query}
                onChange={ (event) => this.updateQuery(event.target.value)}
              />
           </div>

      {/* Currently Reading */}
          <DisplayShelf showingBooks={showingBooks} />


    </div>
    )
  }
}
export default ListBooks
