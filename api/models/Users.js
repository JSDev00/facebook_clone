const mongoose = require('mongoose');
//Validate Email
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const UserSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		min:6,
		max:50,
		unique:true
	},
	email:{
		type:String,
		required:'Email address is required',
		max:50,
		unique:true,
		trim: true,
        lowercase: true,
	    validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

	},
	password:{
		type:String,
		required:true,
		min:6,
	},
	ProfilePic:{
		type:String,
		default:''
	},
	CoverPic:{
		type:String,
		default:''
	},
	followers:{
		type:Array,
		default:[]
	},
	followings:{
		type:Array,
		default:[]
	},
	 isAdmin: {
      type: Boolean,
      default: false,
    },
    desc:{
    	type:String,
    	default:''
    },
    city:{
    	type:String,
    	default:''
    },
    from:{
	  type: String,
      max: 50,
    },
    relationship:{
	  type: Number,
      enum: [1, 2, 3],
    },
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema);