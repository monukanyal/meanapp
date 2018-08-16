var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BookSchema=new Schema({
	user_id:{type:String,index:true},
    Title:{type: String, unique: true,index: true},
    Author:{type: String ,index: true},
    Category:{type: String, index: true},
   	createdAt: {type: Date, index: true,default: Date.now}
});

module.exports=mongoose.model('Book',BookSchema);
