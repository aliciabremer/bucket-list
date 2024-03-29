const User = require("./userModel");

exports.registerNewUser = async (req,res) => {
  try {
    let user = new User({
      username: req.body.username,
      email: req.body.email
    })
    user.password = await user.hashPassword(req.body.password);
    let createdUser = await user.save({ validateModifiedOnly: true })
    res.status(200).json({
      msg: "New user created",
      data: createdUser
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}

exports.loginUser = async (req, res) => {
  const login = {
    email: req.body.email,
    password: req.body.password
  }
  try {
    let user = await User.findOne({
      email: login.email
    });
    if (!user) {
      req.status(400).json({
        type: "Not Found",
        msg: "Wrong Login Details"
      })
    }
    let match = await user.compareUserPassword(login.password, user.password);
    if (match) {
      let token = await user.generateJwtToken({
        user
      }, "secret", {
        expiresIn: 604800
      })
      if (token) {
        res.status(200).json({
          success: true,
          token: token,
          userCredentials: user
        })
      }
    } else {
      res.status(400).json({
        type: "Not Found",
        msg: "Wrong Login Details"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      type: "Something Went wrong",
      msg: err
    })
  }
}
