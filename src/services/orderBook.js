const httpClient = require('../shared/httpClient');
const config = require('../shared/getConfiguration')('./src/config/constants.json', 'utf8');

const orderBook = (book = '', aggregate = true) => {
    return httpClient({
        hostname: config.bitso.BASE_URL,
        path: `/${config.bitso.API_VERSION}/order_book?book=${book}&aggregate=${aggregate}`,
        method: 'GET'
    });
};

module.exports = orderBook;