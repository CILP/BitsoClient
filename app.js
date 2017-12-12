const availableBooks = require('./src/rest/services/availableBooks');
const ticker = require('./src/rest/services/ticker');
const orderBook = require('./src/rest/services/orderBook');
const trades = require('./src/rest/services/trades');

// Get Trades, Ticker and OrderBook for Ether MXN
availableBooks()
    .filter(b => !!~b.book.indexOf('mxn'))
    .filter(b => !!~b.book.indexOf('eth'))
    .map(b => b.book)
    .subscribe(book => {

        trades(book, '').subscribe(trade => {
            console.log(`Trade of book ${book}: `);
            console.log(trade);
        });

        ticker(book).subscribe(tick => {
            console.log(`Ticker of book ${book}: `);
            console.log(tick);
        });

        orderBook(book, true).subscribe(order => {
            console.log(`Order of book ${book}: `);
            console.log(order);
        });
    });