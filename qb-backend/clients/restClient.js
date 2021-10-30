const fetch = require('node-fetch');

module.exports = {
    get: function(url, headers) {
        const options = {
            method: 'GET',
            headers: headers
        }

        return new Promise((resolve, reject) => {
            fetch(url, options)
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(error => reject(error));
        });
    },

    post: function(url, headers, content) {
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(content)
        }

        return new Promise((resolve, reject) => {
            fetch(url, options)
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(error => reject(error));
        });
    }
}
