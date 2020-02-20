const fs = require('fs');
const jwt = require('jsonwebtoken');
const algorithm = 'HS512';

const isAuthorized = (req,res,next) => {
    
    let headers = req.headers.authorization;

    if(headers !== undefined) {
        let token = req.headers.authorization.split(' ')[1];
        let privateKey = fs.readFileSync('./private.pem','utf8');

        jwt.verify(token, privateKey, { algorithm: algorithm }, (err, user) => {
            if (err) {  
                return res.status(500).json({ error: "Invalid Key" });
            }
            return next();
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}


const generateToken =  () => {
    try{
       let privateKey = fs.readFileSync('./private.pem','utf8');
       let jToken = jwt.sign({"body": "stuff"},privateKey,{algorithm: algorithm,expiresIn: '24h'});
       return jToken;
    } catch(err){
       console.log('Error Occured at generateToken ' + err);
       res.status(500).json({ error: "Not Authorized" });
    }
   
 }
 

module.exports = {
    isAuthorized,
    generateToken
}