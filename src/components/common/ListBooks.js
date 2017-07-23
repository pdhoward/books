
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

    showingBooks.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={ (event) => this.updateQuery(event.target.value)}
          />
        <Link
          to="/create"
          className="add-contact"
        >Add Contact</Link>

      </div>

      <ol className='contact-list'>
        {showingBooks.map((book) => (
            <li key={book.id} className='contact-list-item'>

              <div className='contact-details'>
                <p>{book.name}</p>            
              </div>

             <button  onClick={()=>onUpdateBook(book)} className='contact-remove' >
              Update
             </button>

          </li>
        ))}
      </ol>
    </div>
    )
  }
}

export default ListBooks
