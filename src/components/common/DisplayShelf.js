
//////////////////////////////////////////////////////////////////////////
/////////////////  Stateless Functional Component to List ///////////////
/////////////////       Books on the Shelf               ///////////////
////////////////////////////////////////////////////////////////////////

import React        from 'react'

const DisplayShelf = (prop) => {
  let showingBooks = prop.showingBooks
  let selectedOption = prop.selectedOption

  // function to update parent state when new shelf is selected
  const makeChoice = (event) => {
    let book={
      id: event.target.name
    }
    let shelf=event.target.value
    console.log(">>>DISPLAYSHELF<<<<<")
    console.log({book: book})
    console.log({shelf: shelf})

    selectedOption(book, shelf)
  }

  return (

    <ol className="books-grid">

      {showingBooks.map((book) => (

        <li key={book.id} >
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128,
                                             height: 193,
                                             backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
              </div>

              <div className="book-shelf-changer">
                <select id="readlist" name={book.id} onChange={makeChoice} >
                  <option value="" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
             </div>

          </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>          
        </div>
      </li>
     ))}
   </ol>
)}

export default DisplayShelf
