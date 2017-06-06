const availableBooks = require('./src/services/availableBooks');
const ticker = require('./src/services/ticker');
const orderBook = require('./src/services/orderBook');

console.log('[ticker] --');
availableBooks()
    .filter(b => !!~b.book.indexOf('mxn'))
    .map(b => b.book)
    .subscribe(book => {
        ticker(book).subscribe(tick => {
            console.log(tick);
        });
    });

availableBooks()
    .filter(b => !!~b.book.indexOf('mxn'))
    .map(b => b.book)
    .subscribe(book => {
        orderBook(book, true).subscribe(order => {
            console.log(order);
        });
    });