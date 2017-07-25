

//////////////////////////////////////////////////////////////////////////
/////////////////         Search Books                  //////////////////
/////////////////    Tracking Books I like to Read   ////////////////////
////////////////////////////////////////////////////////////////////////

import React            from 'react'
//import * as BooksAPI    from '../../db/BooksAPI'


class SearchBooks extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  }

  render() {

    return (
      <div className="app">

        {this.state.showSearchPage ? (

          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>

            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
        </div>

      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        </div>
      )}
      </div>
    )
  }
}


export default SearchBooks
