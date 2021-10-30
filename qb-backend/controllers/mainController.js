const githubProvider = require('../providers/githubProvider');
const freshdeskProvider = require('../providers/freshdeskProvider');
const MixedContactModel = require('../models/mixedContactModel');

module.exports = {
    /** 
     * Main Demo functionality
     * 
     * Step 1: Get data from a provided Github Username and creates a new Freshdesk Contact into the provided Organization.
     * Step 2: Stores combination of some of the fields from Github and Freshdesk in MongoDB using MixedUser Model.
     */
    createContactFromGithub: function(req, res) {
        githubProvider.getUserData(req.body.username).then(userData => {
            const contact = {
                unique_external_id: userData.id.toString(),
                name: userData.name || userData.login,
                email: userData.email,
                address: userData.location,
            }

            freshdeskProvider.createContact(req.body.freshdeskOrg, contact).then(contactData => {
                console.log(contactData);

                const mixedContact = new MixedContactModel({
                    name : userData.name || userData.login,
                    email : userData.email,
                    githubUser : userData.login,
                    githubLocation : userData.location,
                    githubId : userData.id,
                    freshdeskTimeZone : contactData.time_zone,
                    freshdeskId : contactData.id
                });
        
                mixedContact.save(function (err, mixedContact) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating MixedContact',
                            error: err
                        });
                    }
        
                    return res.status(201).json(mixedContact);
                });
            });
        })
    }
}
