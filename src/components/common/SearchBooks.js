
//////////////////////////////////////////////////////////////////////////
/////////////////         Search Public Library        //////////////////
/////////////////              Backend db              //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import PropTypes              from 'prop-types'
import escapeRegExp           from 'escape-string-regexp'
import DisplaySearch           from './DisplaySearch'
import * as BooksAPI          from '../../db/BooksAPI'

class SearchBooks extends Component {

  static propTypes = {
     onSelectBook: PropTypes.func.isRequired
   }

  constructor() {
     super()
       this.state = {
         query: '',
         books: []
       }
       // binding functions to the component to set context
       this.searchAllBooks =    this.searchAllBooks.bind(this)
       this.selectedOption =    this.selectedOption.bind(this)
       this.renderSearch =      this.renderSearch.bind(this)
     }

   showingBooks = []
   searchBooks = []
   max = 10


  searchAllBooks = (query, max) => {
    console.log(">>>>>>>>>SEARCH TRIGGERED<<<<<<<<<<")
    if(query) {

      console.log(">>>>>>>>>SEARCH IN PROGRESS<<<<<<<<<<")
    BooksAPI.search(query, max).then((books) => {
      console.log({books: books})
      this.setState({books: books})
      })
    }
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.searchAllBooks(query, this.max)
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  selectedOption = (book, shelf) => {
      // update via parent component a book selected and associated shelf
      this.props.onSelectBook(book, shelf)
  }

  renderSearch = () => {
    console.log("DISPLAY SEARCH RESULTS")
    return this.state.books.map(book => (
        <DisplaySearch key={book.id} book={book} selectedOption={this.selectedOption} />
    ))
  }

  render() {

/*
    if (this.showingBooks) {
        none = this.showingBooks.filter((book) => {if (book.shelf === "none") return book})
        console.log("RENDER >>>>>>>>>>>>>>>>>>")
        console.log(this.showingBooks[0])
    }
*/
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

           <div>
             <ol className="books-grid">
                {this.renderSearch()}
             </ol>
          </div>
      </div>
    )
  }
}
export default SearchBooks
