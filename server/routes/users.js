var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var UserModel = require('../models/user');

const SALT = 15;

/* GET home page. */
router.get('/', async function (req, res, next) {
  //change this code to be json and res.send rather than res.render
  try {
    var user;
    user = await UserModel.find();

    res.json({ success: true, data: user });
  } catch (err) {
    console.log('Error: ', err);
  }

});

router.post('/register', async function (req, res, next) {
  var sent = false;
  //Check to see if the user is already registerd.
  UserModel.findOne({ 'email': req.body.email }, (err, user) => {
    if (user) {
      sent = true;
      return res.status(400).json({ message: 'User already exists' });
    } else {
      //Encrypt the password before saving to the database.
      let encryptedPassword = bcrypt.genSalt(SALT, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) return next(err);
          encryptedPassword = hash;

          const user = new UserModel({
            email: req.body.email,
            password: encryptedPassword,
          });

          try {
            const newUser = user.save();
            return res.status(201).json(newUser);
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
  })


});

router.post('/login', async function (req, res, next) {
  //Check to see if the email exists in the database. 
  var user = await UserModel.findOne({ 'email': req.body.email }).exec();
  if (!user) {
    return res.status(404).send({ message: 'Login failed, user not found' });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(400).send({ message: 'Invalid password' });
  }

  const secret = 'mY!littl3@53cR3T';
  const token = jwt.sign({ subject: user.email, expiresIn: 120 }, secret);

  res.status(200).send({ loginToken: token });
});


module.exports = router;
