
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
  state = {
    books: [ ]
  }

  getBook = (shelves) => {
    this.setState( (state) => ({
      // todo
      //contacts: state.contacts.filter((c) => c.id !== contact.id )
    }) )
    BooksAPI.get()
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      console.log('updated book shelf')
      // update state and rerender so it is consistent with db
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })

  }
  favoriteBook(shelves) {
    // todo - star the book
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className='app'>
        <Navbar />

        <Route exact path="/" render={() => (
          <ListBooks
            onUpdateBook={ this.updateBook }
            books={this.state.books}
            />
          )} />

        <Route exact path="/search" render={({history}) => (
          <SearchBooks
            onCreateContact={ (book, shelf) => {
              this.updateBook(book, shelf)
              history.push('/')
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
