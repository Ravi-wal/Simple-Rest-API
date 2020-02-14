const User = require('../models/users.model');

const create = (req,res) => {
    if(!req.body.firstname){
        return res.status(400).json({'message': 'Firstname required'});
    }
    if(!req.body.email){
        return res.status(400).json({'message': 'Email required'});
    }
    if(!req.body.password){
        return res.status(400).json({'message': 'Password required'});
    }
    
    const user = new User({
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'phone': req.body.phone,
        'password': req.body.password,
        'status': req.body.status
    });

    user.save()
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(500).json({ 'message':'Use creation failed' });
        });

    
}

const list = (req,res) => {
    User.find()
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json({'message':'Something went wrong'});
        })
}

module.exports = {
    create,
    list
}