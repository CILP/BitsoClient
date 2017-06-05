const http = require('http'),
    Rx = require('rxjs/Rx'),
    config = require('../shared/getConfiguration')('./src/config/constants.json', 'utf8');

const booksEndpoint = 'available_books';

const availableBooks = () => {
    return Rx.Observable.create(observer => {
        http.get({
            host: config.bitso.BASE_URL,
            path: `/${config.bitso.API_VERSION}/${booksEndpoint}`
        }, response => {
            response.setEncoding('utf8');
            let chunks = [];

            Rx.Observable.fromEvent(response, 'data').subscribe(chunk => {
                chunks.push(chunk);
            });

            Rx.Observable.fromEvent(response, 'error').subscribe(error => {
                observer.error(error);
            });

            Rx.Observable.fromEvent(response, 'end').subscribe(() => {
                const result = JSON.parse(chunks.join(''));
                const { success, payload, error } = result;

                if (!success){
                    observer.error(error);
                }

                payload.forEach(book => {
                    observer.next(book);
                });
                observer.complete();
            });
        });
    });
};

module.exports = { availableBooks };