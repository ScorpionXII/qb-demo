const restClient = require('../clients/restClient');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_BASE_URL = 'https://api.github.com';
const USER_ENDPOINT = GITHUB_BASE_URL + '/users';

module.exports = {
    /**
     * Get Github User Data
     * @param {*} username 
     * @returns 
     */
    getUserData: function(username) {
        const headers = {
                Authorization: `Bearer ${GITHUB_TOKEN}`
        }

        return restClient.get(USER_ENDPOINT + `/${username}`, headers);
    }
}
