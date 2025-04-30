const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


const authServices = {
    Register: async ({ full_name, email, password , confirm_password, phone, birthdate, role }) => {

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
           throw new Error(`Email đã được sử dụng !`);
        }

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (password !== confirm_password) {
            throw new Error(`Vui lòng đảm bảo mật khẩu và xác nhận mật khẩu giống nhau !`)
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const user = new User({
            full_name,
            email,
            password_hash: hashedPassword,
            phone,
            birthdate,
            role
        });

        await user.save();

        return ;
    },

    Login: async ({ email, password }) => {
        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`Email hoặc mật khẩu không đúng !`)
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error(`Email hoặc mật khẩu không đúng !`)
        }

        // Tạo token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Generated token:', token); // Debug log
        console.log('Token length:', token.length); // Debug log

        return token;
    },

    ChangePassword: async ({ userId, currentPassword, newPassword, confirmNewPassword }) => {
        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (newPassword !== confirmNewPassword) {
            throw new Error(`Mật khẩu và xác nhận mật khẩu không khớp !`)
        }

        // Kiểm tra mật khẩu hiện tại
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) {
            throw new Error('Mật khẩu hiện tại không đúng');
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu
        user.password_hash = hashedPassword;
        await user.save();

        return;
    }
}

module.exports = authServices;