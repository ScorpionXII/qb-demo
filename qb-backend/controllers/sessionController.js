const users = [
    { id: 1, name: 'Administrator', username: 'admin', password: 'cWJkZW1vMTIzNCE=' }
]

module.exports = {
    login: function(req, res) {
        const { username, password } = req.body;
        if (username && password) {
            const user = users.find( user => user.username === username && user.password === Buffer.from(password).toString('base64'));
            if (user) {
                req.session.userId = user.id;
                req.session.name = user.name;
                return res.send({ 
                        message: 'Authentication performed successfully!',
                        content: {
                            loggedUser: user.name
                        }
                    });
            }
        }
        return res.status(403).send('Username or password incorrect!');
    },

    logout: function(req, res) {
        req.session.destroy();
        res.send({ message: 'Session destroyed successfully!' });
    },

    checkSession: function(req, res) {
        if(req.session.userId && req.session.name) {
            return res.send({ 
                message: 'Session is still valid!',
                content: {
                    loggedUser: req.session.name
                }
            });
        }
        return res.send({ message: 'Session authentication required!' });
    }
}
