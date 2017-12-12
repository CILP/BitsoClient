const httpClient = require('../../shared/httpsClient');
const config = require('../../shared/getConfiguration')('./src/config/constants.json', 'utf8');

const trade = (book, marker, sort = 'desc', limit = 25) => {
    return httpClient({
        hostname: config.bitso.BASE_URL,
        path: `/${config.bitso.API_VERSION}/trades?book=${book}&marker=${marker}&sort=${sort}&limit=${limit}`,
        method: 'GET'
    });
};

module.exports = trade;