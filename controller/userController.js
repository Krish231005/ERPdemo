const User = require('../models/user');
const userREPO = require('../repositories/userRepository');

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, role, dob, contact, gender } = req.body;
      const newUser = new User({
        username,
        password,
        role,
        dob,
        contact,
        gender,
      });
      const savedUser = await newUser.save();
      userREPO.successResponse(res, 'User registered successfully');
    } catch (error) {
      if (error.code === 11000) {
        userREPO.errorResponse(res, 400, 'Username or email or number already exists');
      } else {
        console.error(error);
        userREPO.errorResponse(res, 500, 'Internal Server Error', error);
      }
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.checkPassword(password))) {
        userREPO.errorResponse(res, 401, 'Invalid credentials');
      } else {
        userREPO.successResponse(res, 'User logged in successfully');
      }
    } catch (error) {
      console.error(error);
      userREPO.errorResponse(res, 500, 'Internal Server Error', error);
    }
  },
};

module.exports = userController;
