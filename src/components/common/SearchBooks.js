
//////////////////////////////////////////////////////////////////////////
/////////////////         Search Public Library        //////////////////
/////////////////              Backend db              //////////////////
////////////////////////////////////////////////////////////////////////

import React, {Component}     from 'react'
import PropTypes              from 'prop-types'
import DisplaySearch          from './DisplaySearch'
import * as BooksAPI          from '../../db/BooksAPI'

class SearchBooks extends Component {

  static propTypes = {
     privateLibrary: PropTypes.array.isRequired,
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

   max = 10

   // searches the db of available books. Backend server accessed via api
   // reference SEARCH_TERMS.md for list of valid search terms

  searchAllBooks = (query, max) => {
    // clear search results if query string is undefined
    if(query === ""){
      let books=[]
      this.setState({books:books})
      }
    // if query detected, execute search and
    // sync the search results with private library (public shelf cannot be trusted)
    // update state with results
    if(query) {
      let x = this.props.privateLibrary.length
      BooksAPI.search(query, max).then((books) => {
        let pubLib = books.map((book) => {
            book.shelf = "none"
            for (let i = 0; i < x; i++) {
              if (book.id === this.props.privateLibrary[i].id) {
                book.shelf = this.props.privateLibrary[i].shelf
              }
            }
            return book
          })
        this.setState({books: pubLib})
      })
    }
  }

  updateQuery = (query) => {
    console.log(">>>>>UPDATE QUERY <<<<<<<<")
    console.log(this.state.books)
    this.setState({ query: query.trim() })
    this.searchAllBooks(query, this.max)
  }

  // move a book from public to private library when menu option selected
  // note this also updates the value for option selected for the shelf in the public search
  selectedOption = (book, shelf) => {
      this.props.onSelectBook(book, shelf)
      console.log(">>>>> BOOK TO UPDATE<<<<<<<<")
      console.log(book)
      console.log(shelf)
      console.log(">>>>> OLD ARRAY <<<<<<<<")
      console.log(this.state.books)
       // clone old state for search results on books
       let oldArray = this.state.books.slice()
       let newArray = oldArray.map((bk) => {
            if (bk.id === book.id) {
                bk.shelf = shelf }
            return bk
          })
      console.log(">>>>> NEW ARRAY <<<<<<<<")
      console.log(newArray)

    this.setState({ books: newArray})

    }
  // render results of api search
  renderSearch = () => {

    console.log(">>>>>RENDER SEARCH <<<<<<<<")
    console.log(this.state.books)
    return this.state.books.map(book => (
        <DisplaySearch key={book.id} book={book} selectedOption={this.selectedOption} />
    ))
  }

  render() {

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
