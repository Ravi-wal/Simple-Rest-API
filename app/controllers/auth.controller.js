const jwt = require("../../config/jwt.config");
const User = require("../models/users.model");
const Token = require("../models/tokens.model");

const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({ message: "Invalid Username or Password" });
  }
  
  try {
    let loginRes = await checkUser(email, password);
    
    if(!!loginRes) {
        let token = await jwt.generateToken(loginRes._id);
        // const tokenData = new Token({
        //   token: token,
        //   active: true
        // });
        // tokenData.save();
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

const logout = async (req,res) => {
  try{
  let headers = req.headers.authorization;

    if(headers !== undefined) {
        let token = req.headers.authorization.split(' ')[1];
        var query = {token: token};
        
        let  tr  = await Token.findOneAndUpdate(query,{$set:{active: false}})
        res.status(200).json({message: 'Successfully logged out'});
    } else {
        res.status(500).json({ error: "Not Authorized" });
       
    }
  }catch(err){
console.log(err)
  }
}

const tokenStatus = async (req,res,next) => {
  let headers = req.headers.authorization;

  if(headers !== undefined) {
      var query = {token: req.headers.authorization.split(' ')[1]};
      var data = await Token.findOne(query);
      if(data.active == true){
        return next();
      } else {
        res.status(500).json({ error: "Not Authorized" });
      }
      
  } else {
    res.status(500).json({ error: "Not Authorized" });
    throw new Error("Not Authorized");
}
}

const listTokens = (req, res) => {
  Token.find()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(400).json({ message: "Something went wrong" });
    });
};
module.exports = {
  login,
  logout,
  listTokens,
  tokenStatus
};
