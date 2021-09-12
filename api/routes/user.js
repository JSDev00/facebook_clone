const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');

//UPDATE USER
router.put('/:id', async (req,res)=>{
	if(req.body.userId===req.params.id || req.body.isAdmin){
		if(req.body.password){
			try{
			//hashed password
			const salt = await bcrypt.genSalt(10);
			const hashedpassword = await bcrypt.hash(req.body.password,salt);

			}catch(err){
				 return res.status(500).json(err);
			}
		}

		try{
			{
			const updatedUser = await User.findByIdAndUpdate(req.params.id,{
				$set:req.body
			},{new:true});
			res.status(200).json("Account has Been Updated...");
		}
		}catch(err){
				 return res.status(500).json(err);

		}
	}else{
		res.status(500).json("You Can Only Update your Account")
	}
})
//DELETE USER
router.delete('/:id', async (req,res)=>{
	if(req.body.userId===req.params.id || req.body.isAdmin){
		try{
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Account has Been Deleted...");
		}catch(err){
			 return res.status(500).json(err);
		}
	}else{
		res.status(500).json("You Can Only Delete your Account")
	}
})
//GET A USER
router.get('/', async (req,res)=>{
	const userId = req.query.userId;
	const username = req.query.username;
	try{
		const user = userId ? await User.findById(userId) : await User.findOne({username:username}) ;
		const{password,isAdmin,createdAt,...other} = user._doc;
		res.status(200).json(other);
	}catch(err){
		res.status(500).json(err)
	}
})




router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//UnFollow

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you already unfollow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});





module.exports = router;