const express = require("express");
const router = express.Router();
const User = require("../Module/user");
const bcrypt = require("bcrypt");

// Sign Up page

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(userName , email , password);
  

  try {
    // check if user is already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists..." }); // ✅ Return here
    }

    // password hash
    const hashPassword = await bcrypt.hash(password, 10);

    //save user
    const newUser = new User({ userName, email, password:hashPassword });
    await newUser.save();

    return res.json({massage:"User is Successfully Register....",data:newUser});
  } catch (error) {
    console.log(error);
    return res.json({ error: "error something...." });
  }
});

// login Page
// router.post("/login", async (req, res) => {
//     const {email, password } = req.body ;

//     try {
//         // check if user is already exist
//         const user = await User.findOne({email});
//         console.log(user);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" }); // ✅ Return here
//         }

//         // password compare
//         const comparePass = await bcrypt.compare(password, user.password);

//         if (!comparePass) {
//           return   res.json({message: "invalid password...."})
//         }

//         // user is login
//        return res.json({
//             message : "user is successFully login....",
//             user : {
//                 id : user._id ,
//                 email : user.email,
//                 username: user.userName,
//             },
//         })

//     } catch (error) {
//         console.log(error);
//         return res.json({error: "error something...."})
//     }
// })
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  

  try {
    const user = await User.findOne({ email });
    console.log(user); // Check what you are getting here
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.json({ message: "Invalid password" });
    }
    return res.json({
      message: "User successfully logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.userName,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong during login." });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});
// delete all users
router.delete("/clear", async (req, res) => {
  try {
    const users = await User.deleteMany();
    return res.json("Clear all Data")
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
