const httpClient = require('../../shared/httpsClient');
const config = require('../../shared/getConfiguration')('./src/config/constants.json', 'utf8');

const ticker = (book) => {
    return httpClient({
        hostname: config.bitso.BASE_URL,
        path: `/${config.bitso.API_VERSION}/ticker?book=${book}`,
        method: 'GET'
    });
};

module.exports = ticker;