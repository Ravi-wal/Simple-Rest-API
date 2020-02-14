module.exports = (app) => {
    const users = require('../controllers/users.controller')
    app.get('/users', users.list);
    app.post('/users', users.create);
}