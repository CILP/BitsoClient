const books = require('./src/services/availableBooks');

books.availableBooks().subscribe(book => {
    console.log(book)
});
