const User =require('../models/users.model');

const login = (req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
        return res.status(500).json({'message':'Invalid Username or Password'});
    }
    User.findOne({'email': email,'password': password})
        .then( userData => {
            if(!userData){
                return res.status(404).json({'message': 'Invalid Username or Password'});
            }
            res.status(200).json(userData);
        })
        .catch( err => {
            return res.status(500).json({'message':'Something went wrong'});
        })
}


module.exports = {
    login
}