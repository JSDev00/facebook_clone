const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
//Create A New User

router.post('/register', async (req,res)=>{
	try{
		//hashed Password
		const salt = await bcrypt.genSalt(10);
		const hashedpassword = await bcrypt.hash(req.body.password,salt);

		//create a new User
		const newUser = new User({

			username:req.body.username,
			email:req.body.email,
			password:hashedpassword,

		});

		//save a user to mongoDB
		const user = await newUser.save();
		res.status(200).json(user);

	}catch(error){
		res.status(500).json(error);
	}
})


//Login With A signed In User
router.post('/login', async (req,res)=>{
	try{
		const user = await User.findOne({email:req.body.email});
		!user && res.status(404).json("User Not Found");
		const password = await bcrypt.compare(req.body.password,user.password);
		!password && res.status(401).json("Password Not Found");
		res.status(200).json(user);

	}catch(err){
		res.status(500).json(err);

	}
})

module.exports = router;