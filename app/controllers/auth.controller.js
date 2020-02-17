const jwt = require("../../config/jwt.config");
const User = require("../models/users.model");

const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({ message: "Invalid Username or Password" });
  }
  
  try {
    let loginRes = await checkUser(email, password);
    if(!!loginRes) {
      let token = await jwt.generateToken();
      res.status(200).json({
        success: true,
        message: "Successfully Logged in",
        email: email,
        token: token
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid deatails'
      })
    }
  } catch (err) {
    console.log('Error: ' + err);
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
};

const checkUser = async (email, password) => {
  const user = await User.findOne({ email: email, password: password });
  return user;
};

module.exports = {
  login
};
