const availableBooks = require('./src/services/availableBooks.beta');
const ticker = require('./src/services/ticker.beta');

availableBooks()
    .filter(b => !!~b.book.indexOf('mxn'))
    .map(b => b.book)
    .subscribe(book => {
        ticker.ticker(book).subscribe(tick => {
            console.log(tick);
        });
    });