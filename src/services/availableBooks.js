const httpClient = require('../shared/httpClient');
const config = require('../shared/getConfiguration')('./src/config/constants.json', 'utf8');

const availableBooks = () => {
    return httpClient({
        hostname: config.bitso.BASE_URL,
        path: `/${config.bitso.API_VERSION}/available_books`,
        method: 'GET'
    });
};

module.exports = availableBooks