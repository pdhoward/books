
//////////////////////////////////////////////////////////////////////////
/////////////////    Container for the Books App        //////////////////
////////////////////////////////////////////////////////////////////////

import React, { Component }   from "react";
import { Route }              from 'react-router-dom'
import Navbar                 from "./common/Navbar";
import Footer                 from "./common/Footer";
import Fork                   from "./common/Fork"
import ListBooks              from './common/ListBooks';
import SearchBooks            from "./common/SearchBooks"
import * as BooksAPI          from '../db/BooksAPI'
import './App.css'

class App extends Component {

  constructor() {
    super()
      this.state = {
        books: [ ]
      }
      // binding functions to the component to set context
      this.getBook =        this.getBook.bind(this)
      this.getAllBooks =    this.getAllBooks.bind(this)
      this.updateBooks =    this.updateBooks.bind(this)
      this.favoriteBook =   this.favoriteBook.bind(this)
    }

  getBook = (shelves) => {
    this.setState( (state) => ({
      // todo
      //contacts: state.contacts.filter((c) => c.id !== contact.id )
    }) )
    BooksAPI.get()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      // update state and rerender so it is consistent with db
      this.getAllBooks()
    })

  }
  favoriteBook(shelves) {
    // todo - star the book
  }

  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    return (
      <div className='app'>
        <Navbar />

        <Route exact path="/" render={() => (
          <ListBooks
            onUpdateBooks={ this.updateBooks }
            books={this.state.books}
            />
          )} />

        <Route exact path="/search" render={({history}) => (
          <SearchBooks
             onSelectBook={ (book, shelf) => {
              this.updateBooks(book, shelf)              
             }}
            />
          )} />

       <Footer />
       <Fork />

     </div>
    );
  }
}

export default App;
