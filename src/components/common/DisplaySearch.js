///////////////////////////////////////////////////////////////////////////
/////////////////         Component Lists Books            ///////////////
/////////////////          Retrieved in Search             //////////////
////////////////////////////////////////////////////////////////////////

import React, { Component }       from 'react'


class DisplaySearch extends Component {

  book = this.props.book
  selectedOption = this.props.selectedOption

  // function to update parent state when new shelf is selected
  makeChoice = (event) => {
    let book={
      id: event.target.name
    }
    let shelf=event.target.value
    console.log(">>>DISPLAYSHELF<<<<<")
    console.log({book: book})
    console.log({shelf: shelf})

    this.selectedOption(book, shelf)
  }

  render() {

  let book = this.book

  return (
      <li key={book.id} >
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128,
                                             height: 193,
                                             backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
              </div>

              <div className="book-shelf-changer">
                <select id="readlist" name={book.id} value={book.shelf} onChange={this.makeChoice} >
                  <option value="" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
             </div>

          </div>
            <div className="book-title">{book.title}</div>
            {book.authors && (
              <div className="book-authors">{book.authors[0]}</div>
            )}
        </div>
    </li>

)}}

export default DisplaySearch
