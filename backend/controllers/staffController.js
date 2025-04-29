const StaffService = require('../services/staffService')

class StaffControllers {
    async getAllMembers(req,res){
        try{
            const listMembers = await StaffService.getAllMembers();
            res.status(200).json({
                success : 'true',
                message : "Get All members successfully",
                listMembers : listMembers
            })

        }catch(error){
            console.log(error);
            res.status(500).json({
                success : false,
                message : "Fail to get All members",
                error : error
            })
            
        }
    }
    async getMembersById(req,res){
        try{
            const memberId = req.parrams.id;
            const member = await StaffService.getMemberById(memberId);
            res.status(200).json({
                success: 'true',
                member : member
            })


        }catch(error){
            console.log(error);
            res.status(500).json({
                success: false,
                message : "Fail to get Members",
                error: error
            })
            
        }
    }

}

module.exports = new StaffControllers();