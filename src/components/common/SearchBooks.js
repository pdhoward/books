
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
         query: '',
         books: []
       }
       // binding functions to the component to set context
       this.searchAllBooks =    this.searchAllBooks.bind(this)
       this.selectedOption =    this.selectedOption.bind(this)
     }

   showingBooks = []
   searchBooks = []
   max = 10


  searchAllBooks = (query, max, cb) => {
    console.log(">>>>>>>>>>DEBUG SEARCH API <<<<<<<<<<<<")
    console.log({query: query})
    console.log({max: max})

    if(query) {

    BooksAPI.search(query, max).then((books) => {
      console.log({books: books})
      return cb(books)
    })
  }
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

//<DisplayShelf showingBooks={bks} selectedOption={opt} />
  render() {

    let none
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

       {this.searchAllBooks(this.state.query, this.max, function(bks) {
              console.log(bks.length)
              bks.length !== 0 && (
              <div>
                <h5 className="bookshelf-title">Make a Selection</h5>
                <DisplayShelf showingBooks={bks} selectedOption={() => {console.log('fix this')}} />
             </div>
              )}
           )}



    </div>
    )
  }
}
export default SearchBooks
