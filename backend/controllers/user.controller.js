import User from '../models/user.model.js'
export const  getUsersForSidebar = async(req,res)=>{

    try {
    
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id: {$ne : loggedInUserId}}).select("-password")//jo user already login hai uski chat nahi dikhegi

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar",error.message)
        res.send(500).json({error:"Internal server error"})
    }
}