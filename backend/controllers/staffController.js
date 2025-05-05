
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
            const member = await staffService.getMemberById(req.params.id);
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

    async deleteMemberById(req,res){
        try{
            const deleteMemberById = await staffService.deleteMember(req.params.id);
            res.status(200).json({
                success : "true",
                message : "delete members successfully",
            })

        }catch(error){
            console.log(error);
            res.status(404).json({
                success : false,
                message : "can not find members by Id",
                error : error
            })
            
        }
    }

    async respondToFeedback(req,res){
        try{
            const updatedFeedback = await StaffService.respondToFeedBack(req.params.id,req.body.response);
            res.status(200).json({
                success : true,
                message : "Feedback responded successfully",
                data : updatedFeedback
            })
            

        }catch(error){
            console.log(error);
            res.status(404).json({
                success : false,
                message : "Failed to respond to feedback",
                error : error.message
            })
            
        }
    }

    async getWorkoutHistory(req,res){
        try{
            const workout = await staffService.getWorkoutHistory(req.params.id);
            res.status(200).json({
                success : true,
                data : workout
            })

        }catch(error){
            console.log(error);
            res.status(404).json({
                success : false,
                message : "failed to get workout history",
                error : error
            })
            
        }
    }
    
    async registerSubscription (req,res){
        try{
            const subscription = await StaffService.registerSubscriptionService(req.params.id, req.body);
            res.status(200).json({
                success : true,
                message : "Subscription registered successfully",
                data : subscription
            })

        }catch(error){
            console.log(error);
            res.status(404).json({
                success : false,
                message: "An error occurred while register the subscription"
            })
            
        }
    }

    async updateMemberSubscription (req,res) {
        try{
            const updatedSuscription = await StaffService.updateMemberSubscription(req.params.id,req.body);
            console.log(req.params.id);
            console.log(req.body);
            res.status(200).json({
                success : true,
                message : "Subscription updated successfully",
                data : updatedSuscription
            })
        }catch(error){
            console.log(error);
            res.status(404).json({
                success : false, 
                error : error.message
            })
            
        }
        
    }
}

module.exports = new StaffControllers();