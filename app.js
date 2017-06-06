const availableBooks = require('./src/services/availableBooks');
const ticker = require('./src/services/ticker');

availableBooks()
    .filter(b => !!~b.book.indexOf('mxn'))
    .map(b => b.book)
    .subscribe(book => {
        ticker(book).subscribe(tick => {
            console.log(tick);
        });
    });