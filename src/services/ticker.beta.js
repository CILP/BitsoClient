const httpClient = require('../shared/httpClient');
const config = require('../shared/getConfiguration')('./src/config/constants.json', 'utf8');

const ticker = (book = '') => {
    return httpClient.httpClient({
        host: config.bitso.BASE_URL,
        path: `/${config.bitso.API_VERSION}/ticker?book=${book}`
    });
};

module.exports = { ticker };