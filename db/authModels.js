const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  token: String
});

const Auth = mongoose.model('Auth', authSchema);

module.exports.findUserByUserName = async (userName) => {
  try {
    let user = await Auth.findOne({userName: userName});
    return user;
  } catch(err) {
    console.log(err)
    return err;
  }
}

module.exports.checkUserNameTaken = async (userName) => {
  try {
    let userNameCount = await Auth.countDocuments({userName: userName});
    console.log('username count', userNameCount)
    if (userNameCount === 0) {
      return false;
    } else {
      return true;
    }
  } catch(err) {
    console.log(err)
    return err;
  }
}

module.exports.checkEmailTaken = async (email) => {
  try {
    let emailCount = await Auth.countDocuments({email: email});
    console.log('email count', emailCount)
    if (emailCount === 0) {
      return false;
    } else {
      return true;
    }
  } catch(err) {
    console.log(err)
    return err;
  }
}

module.exports.updateUser = async (user) => {
  try {
    await Auth.findOneAndUpdate({email: user.email}, user, {upsert: true});
    return true
  } catch(err) {
    return err
  }
}