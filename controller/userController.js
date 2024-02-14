const User = require('../models/user');
const userREPO = require('../repositories/userRepository');

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, role, dob, contact, gender,image} = req.body;
      // if (!req.file) {
      //   return userREPO.errorResponse(res, 400, 'Image is required');
      // }

      // const image = req.file.filename;

      const newUser = new User({
        username,
        password,
        role,
        dob,
        contact,
        gender,
        image
      });

      await newUser.save();

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
        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { 'contact.email': identifier },
                { 'contact.mobile': identifier },
            ],
        });
        if (!user || !(await user.checkPassword(password))) {
            userREPO.errorResponse(res, 401, 'Invalid credentials');
        } else {
            userREPO.successResponse(res, 'User logged in successfully');
        }
    } 
    catch (error) {
        console.error(error);
        userREPO.errorResponse(res, 500, 'Internal Server Error', error);
    }
  },

  showuser: async(req,resp)=>{
    try{
      const users=await User.aggregate([{
        $addFields:{ newStringFIeld:{$toString:"$_id"},},
      },
    {
      $lookup:{from:"files",localField:"newStringFIeld",foreignField:"userId",as:"result",},
    },
  ]);
  userREPO.successResponse(resp,users,"user fetched successfully");
    }
    catch(error)
    {
      console.error(error);
      userREPO.errorResponse(resp,500,"internal server error",error);
    }
  },
  showCustomers: async (req, res) => {
    try {
      const customers = await User.find({ role: 'customer' });
      userREPO.successResponse(res, customers, 'Customers fetched successfully');
    } catch (error) {
      console.error(error);
      userREPO.errorResponse(res, 500, 'Internal Server Error', error);
    }
  },
};

module.exports = userController;
