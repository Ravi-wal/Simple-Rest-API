const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token:{
        type: String
    },
    active:{
        type: Boolean
    }
},
{
  timestamps: true
});

module.exports = mongoose.model('Tokens',tokenSchema);
