const http = require('http'),
    Rx = require('rxjs/Rx');

const httpClient = (url) => {
    return Rx.Observable.create(observer => {
        http.get({
            host: url.host,
            path: url.path
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

                if (Array.isArray(payload)){
                    payload.forEach(p => {
                        observer.next(p);
                    });
                } else {
                    observer.next(payload);
                }
                observer.complete();
            });
        });
    });
};

module.exports = httpClient;