
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

  constructor() {
     super()
       this.state = {
         query: ''
       }
       // binding functions to the component to set context
       this.searchAllBooks =    this.searchAllBooks.bind(this)
     }

   showingbooks = []
   max = 10


  searchAllBooks = (query, max) => {
    console.log(">>>>>>>>>>DEBUG SEARCH API <<<<<<<<<<<<")
    console.log({query: query})
    console.log({max: max})

    BooksAPI.search(query, max).then((books) => {
      console.log({books: books})

      console.log(">>>>>>>>>>>>HACK<<<<<<<<<<<<<<<")
      this.showingBooks = books
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

  renderBooks() {
    if (this.showingBooks) {
      return (
        <div>
          <h5 className="bookshelf-title">Make a Selection</h5>
          <DisplayShelf showingBooks={this.showingBooks} selectedOption={this.selectedOption} />
        </div>
    )}}

  render() {
    let { query } = this.state

    if (query) {
      this.searchAllBooks(query, this.max)
    }

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
            {this.renderBooks()}
    </div>
    )
  }
}
export default SearchBooks
