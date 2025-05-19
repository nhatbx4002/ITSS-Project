const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ưu tiên route cụ thể trước
router.get('/staff', userController.getAllStaff);
router.put('/staff/:id', userController.updateStaff);

router.get('/member', userController.getAllMember);
router.put('/member/:id', userController.updateMember);

// Tạo và lấy tất cả user
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

// Route động - để cuối cùng
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);




module.exports = router;
