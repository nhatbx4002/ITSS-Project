const User = require('../models/usersModel')
const bcrypt = require('bcrypt');

class CoachService {
   async getAllCoaches(searchName = '') {
  const query = {
    role: 'trainer',
    ...(searchName && {
      full_name: { $regex: searchName, $options: 'i' } // tìm tên chứa searchName, không phân biệt hoa thường
    })
  };

  return await User.find(query).select('-password_hash');
}

   async createCoaches(data) {
  const { full_name, email, password, confirm_password, phone, birthdate } = data;

  // Kiểm tra thiếu thông tin
  if (!full_name || !email || !password || !confirm_password || !phone || !birthdate) {
    throw new Error('Missing required fields');
  }

  // Kiểm tra mật khẩu trùng khớp
  if (password !== confirm_password) {
    throw new Error('Vui lòng đảm bảo mật khẩu và xác nhận mật khẩu giống nhau!');
  }

  // Kiểm tra trùng email hoặc số điện thoại
  const [checkEmail, checkPhone] = await Promise.all([
    User.findOne({ email }),
    User.findOne({ phone }),
  ]);
  if (checkEmail || checkPhone) {
    throw new Error('Tài khoản đã tồn tại');
  }

  // Hash mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tạo user mới với role mặc định là trainer
  const newUser = new User({
    full_name,
    email,
    password_hash: hashedPassword,
    phone,
    birthdate,
    role: 'trainer',
  });

  await newUser.save();
  return newUser;
}

      async deleteCoach(id){
        return await User.findByIdAndDelete(id);
      }
}

module.exports = new CoachService();