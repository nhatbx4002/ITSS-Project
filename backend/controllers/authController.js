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
    const {user, token} = await authServices.Login(req.body);

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      user,
      authToken: token
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

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu ID token từ Google',
      });
    }

    const {user, token} = await authServices.GoogleLogin({ idToken });


    res.json({
      success: true,
      message: 'Đăng nhập Google thành công',
      user,
      authToken: token,
    });

  } catch (error) {
    console.error('[Google Login Error]', error);
    res.status(500).json({
      success: false,
      message: 'Xác thực Google thất bại',
      detail: error.message,
    });
  }
};


