const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Tạo user
router.post('/', userController.createUser);

// Lấy tất cả user
router.get('/', userController.getAllUsers);

router.get('/member', userController.getAllMember);

router.put('/member', userController.updateMember);
// Lấy user theo ID
router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;
