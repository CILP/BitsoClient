const http = require('http'),
    Rx = require('rxjs/Rx');

const httpClient = (options = {}) => {
    return Rx.Observable.create(observer => {
        
        const request = http.request(options, response => {
            response.setEncoding('utf8');

            const chunks = [];

            Rx.Observable.fromEvent(response, 'data').subscribe(chunk => {
                chunks.push(chunk);
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

        Rx.Observable.fromEvent(request, 'error').subscribe(error => {
            observer.error(error);
        });

        if (options.postData) {
            request.write(options.postData);
        }

        request.end();
    });
};

module.exports = httpClient;