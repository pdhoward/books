
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
     }

   showingBooks = []
   searchBooks = []
   max = 10


  searchAllBooks = (query, max) => {
    console.log(">>>>>>>>>>DEBUG SEARCH API <<<<<<<<<<<<")
    console.log({query: query})
    console.log({max: max})

    BooksAPI.search(query, max).then((books) => {
      console.log({books: books})
  //    this.setState({books: books})
        this.searchBooks = books
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

  componentWillUpdate(newProps, newState) {

    console.log("LIFECYCLE componentwillupdate >>>>>>>>>>>>>")
    console.log({state: this.state.query})
    console.log(JSON.stringify(newState))

  //  let { query } = this.state
  //  let { books } = this.state
    let {query} = newState
    if (query) {
      this.searchAllBooks(query, this.max)
        const match = new RegExp(escapeRegExp(query), 'i')
//      this.showingBooks = books.filter((book) => match.test(book.title))
        this.showingBooks = this.searchBooks.filter((book) => match.test(book.title))
      }

  }


  render() {

    let none

    if (this.showingBooks) {
        none = this.showingBooks.filter((book) => {if (book.shelf === "none") return book})
        console.log("RENDER >>>>>>>>>>>>>>>>>>")
        console.log(this.showingBooks[0])
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

         {this.showingBooks.length !== 0 && (
            <div>
              <h5 className="bookshelf-title">Make a Selection</h5>
              <DisplayShelf showingBooks={none} selectedOption={this.selectedOption} />
           </div>
         )}

    </div>
    )
  }
}
export default SearchBooks
