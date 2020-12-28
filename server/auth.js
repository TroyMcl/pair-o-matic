const {
  findUserByUserName,
  checkEmailTaken,
  checkUserNameTaken,
  updateUser
} = require('../db/authModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (userName) => {
  const token = jwt.sign({
    userName
  },
  'changeMeToEnvVar',
  {
    expiresIn: "30 days"
  })
  return token;
}

module.exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
  const user = await findUserByUserName(userName);
  if (!user ) {
    throw 'No user'
  }
  const authorized = await bcrypt.compare(password, user.password);

  if (authorized) {
    const token = generateToken(userName)
    await updateUser({email: user.email, token})
    console.log('you are logged in had have a JWT')
    res.cookie("bearer", token);
    res.status(200).send({
      status: 'success',
      message: 'You are logged in'
    })
  } else {
    throw "incorrect password"
  }
  } catch(err) {
    console.log(err);
    res.status(403).send({
      status: 'failure',
      message: 'You are not authorized'
    })
  }
}

module.exports.signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const userNameTaken = await checkUserNameTaken(userName);
    const emailTaken = await checkEmailTaken(email);

    if (!userNameTaken && !emailTaken) {
      let hash = await bcrypt.hash(password, 14)
      let saved = await updateUser({userName: userName, email: email, password: hash})
      if (saved === true) {
        res.status(200).send({
          status: 'success',
          message: 'New user created'
        });
      }
    } else {
      res.status(403).send({
        status: 'failure',
        message: 'Cannot create new account with selected user name and password'
      })
    }

  } catch (err) {
    res.status(500).send({
      status: 'failure',
      message: error
    })
  }
}

module.exports.verify = async (req, res, next) => {
  const token = req.cookies.bearer;
  console.log(req.cookies, " & ", token)
  try {
    const decoded = jwt.verify(token, 'changeMeToEnvVar');
    const user = await findUserByUserName(decoded.userName);
    if(user && user.token === token) {
      next();
    } else {
      throw 'Validation Failed';
    }
  } catch(err) {
    console.log(err);
    res.status(403).send();
  }
  // jwt.verify(token, 'changeMeToEnvVar', (err, decoded) => {
  //   if (err) {
  //     console.log('not autorized no token');
  //     res.status(403).send();
  //   } else {
  //     console.log('it worked')
  //     next();
  //   }
  // })
};