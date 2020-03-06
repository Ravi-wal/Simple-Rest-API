const User = require("../models/users.model");

const create = async (req, res) => {
  if (!req.body.firstname) {
    return res.status(422).json({ status: false, message: "Firstname required" });
  }
  if (!req.body.email) {
    return res.status(422).json({ status: false, message: "Email required" });
  }
  if (!req.body.password) {
    return res.status(422).json({ status: false,  message: "Password required" });
  }

  try{
    if(await User.findOne({ email: req.body.email })){
      return res.status(422).json({
        status: false, 
        message: "Already registered with the email " + req.body.email
      });
    } else {
      await createUser(req.body);
      res.status(200).json({ status: true, message: "User created succesfully" });
    }
  } catch(err){
    return res.status(500).json({ status: false,  message: "Something went wrong" });
  }
};


function createUser(details) {
  const user = new User(details);
  user.save().catch(err => {
    throw err;
  });
}


const list = (req, res) => {
  User.find()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(400).json({ message: "Something went wrong" });
    });
};

const findone = (req, res) => {
let userId = req.body.userId ? req.body.userId : req.params.userId;
  User.findById(userId)
    .then(data => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "User Not Found with ID " + userId });
      }
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the ID " + userId
      });
    });
};

const update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      status: req.body.status
    },
    { new: true }
  )
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: "User Not Found with the Update ID " + req.params.userId
        });
      }
      return res.status(200).json({success: true,message: "Updated Successfully"});
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the Update ID " + req.params.userId
      });
    });
};

const remove = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: "User Not Found with the Remove ID " + req.params.userId
        });
      }
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the Remove ID " + req.params.userId
      });
    });
};

const removeAll = (req, res) => {
  User.remove({})
    .then(data => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "Collection deleted Successfully " });
      }
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({ message: "Some thing went wrong" });
    });
};

module.exports = {
  create,
  list,
  findone,
  update,
  remove,
  removeAll
};
