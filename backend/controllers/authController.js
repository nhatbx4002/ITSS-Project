const authServices = require('../services/authServices');
const User = require('../models/usersModel');

// Đăng ký tài khoản mới
exports.register = async (req, res) => {
  try {
    await authServices.Register(req.body);

    res.status(201).json({
      message: 'Đăng ký thành công',
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const token = await authServices.Login(req.body);

    res.json({
      message: 'Đăng nhập thành công',
      token: token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Lấy thông tin user hiện tại
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password_hash');
    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    
    await authServices.ChangePassword({
      userId: req.user._id,
      currentPassword,
      newPassword,
      confirmNewPassword
    });

    res.json({
      success: true,
      message: 'Đổi mật khẩu thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 