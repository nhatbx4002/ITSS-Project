const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Không tìm thấy token xác thực ! Hãy đăng nhập lại' });
    }

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tìm user từ token
    const user = await User.findOne({ _id: decoded.userId });
    
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    // Lưu thông tin user vào request
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    res.status(401).json({
      data: error.message,
      message: 'Token không hợp lệ'
    });
  }
};

// Middleware kiểm tra quyền admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Không có quyền truy cập' });
  }
  next();
};

// Middleware kiểm tra quyền trainer
const trainerMiddleware = (req, res, next) => {
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ message: 'Không có quyền truy cập' });
  }
  next();
};

const staffMiddleware = (req, res, next) => {
  if (req.user.role !== 'staff') {
    return res.status(403).json({ message: 'Không có quyền truy cập' });
  }
  next();
};



module.exports = {
  authMiddleware,
  adminMiddleware,
  trainerMiddleware,
  staffMiddleware
}; 