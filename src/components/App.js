
//////////////////////////////////////////////////////////////////////////
/////////////////    Container for the Books App        //////////////////
////////////////////////////////////////////////////////////////////////

import React, { Component }   from "react";
import Navbar                 from "./common/Navbar";
import Footer                 from "./common/Footer";


// listhelves need to display -- siomcilar to contacts app list contacts
// search needs to do the dynamic search -- as embedded in contacts/listcontacts

class App extends Component {
  state = {
    shelves: [ ]
  }

  removeBook = (shelves) => {
    this.setState( (state) => ({
      // todo
      //contacts: state.contacts.filter((c) => c.id !== contact.id )
    }) )
    //ContactsAPI.remove(contact)
  }

  moveBook(shelves) {
    // todo - move to 1 of 3 shelves currently reading, want to read, read

  }
  favoriteBook(shelves) {
    // todo - star the book

  }

  componentDidMount() {
    // retrieve all books -- from backend server?
  //  ContactsAPI.getAll().then((contacts) => {
  //    this.setState({ contacts })
  //  })
  }
  render() {
    return (
      <div className = 'app'>
        <Navbar />

        <Route exact path ="/" render={() => (
          <ListBooks
            onDeleteBook = { this.removeBook }
            shelves={this.state.shelves}
            />
          )} />

        <Route exact path ="/search" render={({history}) => (
          <SearchBooks
            onCreateContact={ (contact) => {
              this.createContact(contact)
              history.push('/')
            }}
            />
          )} />

       <Footer />

       </div>
    );
  }
}

export default App;
