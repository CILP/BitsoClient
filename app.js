const books = require('./src/services/availableBooks');
const ticker = require('./src/services/ticker.beta');

books.availableBooks()
    .filter(b => !!~b.book.indexOf('mxn'))
    .map(b => b.book)
    .subscribe(book => {
        console.log(book);
    });

ticker.ticker('btc_mxn').subscribe(tick => {
    console.log(tick);
});