
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema of meeting to DB
var meetingSchema = new Schema({
  firstName: {type:String , required: true},
  lastName:{type:String, required:true},
  email:{type:String, required:true},
  date:{type:String, required:true},
});

module.exports = mongoose.model('Meeting', meetingSchema);