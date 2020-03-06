const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchems = new Schema({
                        title:{
                            type: String
                        },
                        slug:{
                            type: String
                        },
                        image:{
                            type: String
                        },
                        body: {
                            type: String
                        },
                        status: {
                            type: Boolean
                        },
                        userId: {
                            type: String
                        }
                    }, {
                        timestamps: true
                    });
module.exports = mongoose.model('Posts',postSchems);