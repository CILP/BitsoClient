const http = require('http'),
    Rx = require('rxjs/Rx'),
    config = require('../shared/getConfiguration')('./src/config/constants.json', 'utf8');

const tickerEndpoint = 'ticker';

const ticker = (book = 'btc_mxn') => {
    return Rx.Observable.create(observer => {
        http.get({
            host: config.bitso.BASE_URL,
            path: `/${config.bitso.API_VERSION}/${tickerEndpoint}?book=${book}`
        }, response => {
            response.setEncoding('utf8');
            let chunks = [];

            Rx.Observable.fromEvent(response, 'data').subscribe(chunk => {
                console.log(chunk);
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

                observer.next(payload);
                observer.complete();
            });
        });
    });
};

module.exports = { ticker };