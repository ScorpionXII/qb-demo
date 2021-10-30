const restClient = require('../clients/restClient');

const FRESHDESK_TOKEN = process.env.FRESHDESK_TOKEN;
const FRESHDESK_TRAILING_DOMAIN = 'freshdesk.com';
const FRESHDESK_CONTACTS_ENDPOINT = '/api/v2/contacts';

module.exports = {
    /**
     * Create Freshdesk Contact
     * @param {*} payload 
     * @returns 
     */
    createContact: function(freshdeskOrg, payload) {
        const headers = {
            Authorization: `Basic ${new Buffer.from(FRESHDESK_TOKEN).toString('base64')}`,
            'Content-Type': 'application/json'
        }

        console.log(freshdeskOrg);
        return restClient.post(`https://${freshdeskOrg}.${FRESHDESK_TRAILING_DOMAIN}${FRESHDESK_CONTACTS_ENDPOINT}`, headers, payload);
    }
}
