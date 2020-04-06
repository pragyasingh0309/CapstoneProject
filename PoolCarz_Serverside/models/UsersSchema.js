var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UsersSchema= new Schema({
  username:String,
  password:String
});

module.exports=mongoose.model("Userslist",UsersSchema);
