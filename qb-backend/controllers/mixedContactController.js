const MixedContactModel = require('../models/mixedContactModel.js');

/**
 * mixedContactController.js
 *
 * @description :: Server-side logic for managing mixedContacts.
 */
module.exports = {

    /**
     * mixedContactController.list()
     */
    list: function (req, res) {
        MixedContactModel.find(function (err, mixedContacts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting mixedContacts.',
                    error: err
                });
            }

            return res.json(mixedContacts);
        });
    },

    /**
     * mixedContactController.show()
     */
    show: function (req, res) {
        let id = req.params.id;

        MixedContactModel.findOne({_id: id}, function (err, mixedContact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting mixedContact.',
                    error: err
                });
            }

            if (!mixedContact) {
                return res.status(404).json({
                    message: 'No such mixedContact'
                });
            }

            return res.json(mixedContact);
        });
    },

    /**
     * mixedContactController.create()
     */
    create: function (req, res) {
        const mixedContact = new MixedContactModel({
			name : req.body.name,
			email : req.body.email,
			githubUser : req.body.githubUser,
			githubLocation : req.body.githubLocation,
			githubId : req.body.githubId,
			freshdeskTimeZone : req.body.freshdeskTimeZone,
			freshdeskId : req.body.freshdeskId
        });

        mixedContact.save(function (err, mixedContact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating mixedContact',
                    error: err
                });
            }

            return res.status(201).json(mixedContact);
        });
    },

    /**
     * mixedContactController.update()
     */
    update: function (req, res) {
        let id = req.params.id;

        MixedContactModel.findOne({_id: id}, function (err, mixedContact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting mixedContact',
                    error: err
                });
            }

            if (!mixedContact) {
                return res.status(404).json({
                    message: 'No such mixedContact'
                });
            }

            mixedContact.name = req.body.name ? req.body.name : mixedContact.name;
			mixedContact.email = req.body.email ? req.body.email : mixedContact.email;
			mixedContact.githubUser = req.body.githubUser ? req.body.githubUser : mixedContact.githubUser;
			mixedContact.githubLocation = req.body.githubLocation ? req.body.githubLocation : mixedContact.githubLocation;
			mixedContact.githubId = req.body.githubId ? req.body.githubId : mixedContact.githubId;
			mixedContact.freshdeskTimeZone = req.body.freshdeskTimeZone ? req.body.freshdeskTimeZone : mixedContact.freshdeskTimeZone;
			mixedContact.freshdeskId = req.body.freshdeskId ? req.body.freshdeskId : mixedContact.freshdeskId;
			
            mixedContact.save(function (err, mixedContact) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating mixedContact.',
                        error: err
                    });
                }

                return res.json(mixedContact);
            });
        });
    },

    /**
     * mixedContactController.remove()
     */
    remove: function (req, res) {
        let id = req.params.id;

        MixedContactModel.findByIdAndRemove(id, function (err, mixedContact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the mixedContact.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
