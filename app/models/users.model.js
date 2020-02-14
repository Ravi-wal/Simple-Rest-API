const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
                       'firstname':{
                           type: String
                       },
                       'lastname':{
                           type: String
                       },
                       'email': {
                           type: String,
                           required: true
                       },
                       'phone': {
                           type: Number
                       },
                       'password':{
                           type: String,
                           required: true
                       },
                       'status': {
                           type: Boolean
                       }
                    }, {
                        timestamps: true
                    });

module.exports = mongoose.model('Users',userSchema);

