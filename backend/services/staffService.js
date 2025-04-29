const User = require("../models/usersModel");

class StaffService {
    async getAllMembers(){
        return User.find({role : 'member'});    
    }
    async getMemberById(userId){
         const user = await User.findById(userId);
         if(!user){
            throw new Error('User not found!');
         }
         return user;
    }
}

module.exports = new StaffService();