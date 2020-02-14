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

    // User.findOne({'email': req.body.email})
    //     .then( data => {
    //             return res.status(400).json({'message':'Already registered with the email ' + req.body.email});
    //     })
    //     .catch(err => {
    //         return res.status(500).json({'message' : 'Something went wrong'});

    //     })
    
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
            return res.status(500).json({ 'message':'User creation failed' });
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

const findone = (req,res) => {
    User.findById(req.params.userId)
        .then( data => {
            if(!data){
                return res.status(404).json({'message': 'User Not Found with ID ' + req.params.userId});
            }
            return res.status(200).json(data);
        })
        .catch( err => {
            return res.status(500).json({'message': 'Some thing went wrong with the ID ' + req.params.userId});
        })
}

const update = (req,res) => {
    User.findByIdAndUpdate(req.params.userId,
        {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'email': req.body.email,
            'phone': req.body.phone,
            'password': req.body.password,
            'status': req.body.status
        },
        { new: true}
        )
    .then( data => {
        if(!data){
            return res.status(404).json({'message': 'User Not Found with the Update ID ' + req.params.userId});
        }
        return res.status(200).json(data);
    })
    .catch( err => {
        return res.status(500).json({'message': 'Some thing went wrong with the Update ID ' + req.params.userId});
    })
}


const remove = (req,res) => {
    User.findByIdAndRemove(req.params.userId)
    .then( data => {
        if(!data){
            return res.status(404).json({'message': 'User Not Found with the Remove ID ' + req.params.userId});
        }
        return res.status(200).json(data);
    })
    .catch( err => {
        return res.status(500).json({'message': 'Some thing went wrong with the Remove ID ' + req.params.userId});
    })
}

const removeAll = (req,res) => {
    User.remove({})
    .then( data => {
        if(!data){
            return res.status(404).json({'message': 'Collection deleted Successfully '});
        }
        return res.status(200).json(data);
    })
    .catch( err => {
        return res.status(500).json({'message': 'Some thing went wrong'});
    })
}


module.exports = {
    create,
    list,
    findone,
    update,
    remove,
    removeAll
}