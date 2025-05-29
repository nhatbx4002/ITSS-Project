const coachService = require('../services/coachService')

class CoachController {
   async getAllCoaches(req,res){
     try{
        const searchName = req.query.name || '';
        const getAllCoaches = await coachService.getAllCoaches(searchName);
        res.status(200).json({
            success : true,
            message : "Coaches retrieved successfully",
            data : getAllCoaches
        })
     }catch(error){
        res.status(404).json({
            message: 'Error fetching coaches',
            success : false,
            error : error
        })
     }
   }

   async createCoach(req,res){
      try{
         const createCoach = await coachService.createCoaches(req.body);
         res.status(200).json({
            success : true,
            message : "Coach created successfully",
            data : createCoach   
         })
      }catch(error){
         res.status(404).json({
            message: 'Error creating coach',
            success : false,
            error : error
         })
      }
   }

   async deleteCoach(req,res){
      try{
          const deleteCoach = await coachService.deleteCoach(req.params.id);
          res.status(200).json({
            success : true,
            message : "Coach deleted successfully",
            data : deleteCoach
          })
      }catch(error){
         res.status(404).json({
            message: 'Error deleting coach',
            success : false,
            error : error
         })
      }
   }
}

module.exports = new CoachController()