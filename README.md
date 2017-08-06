
## Books App

The worlds greatest collection of books that are of interest to me

## Getting Set Up

Getting the app running on your local machine takes only a few steps:

1. clone the project - `git clone https://github.com/pdhoward/books.git
2. install its dependencies - `npm install`
3. start the app - npm run start

## Backend Server

Note that a backend server has been provided for testing purposes

BooksAPI.js contains the set of methods for all required operations

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## License and Use
 [LICENSE](LICENSE.txt).

## Allowed Search Terms
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in
[SEARCH_TERMS](SEARCH_TERMS.md).
That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

For details, check out [CONTRIBUTING](CONTRIBUTING.md).
