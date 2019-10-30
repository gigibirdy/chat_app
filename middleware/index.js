const User = require("../models/users");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
let middlewareObj = {};

//validation of username and password
middlewareObj.validateUserInfo = async (req, res, next) => {
  try {
    var badUser = new User({name: req.body.name, password: req.body.password})
    var error = badUser.validateSync();
    if(error){
      if(error.errors.password){
        res.status(400).json({
          message: "Please provide password"
        })
      } else if (error.errors.name){
        res.status(400).json({
          message: "Please provide username"
        })
      }
    } else {
      next();
    }
  } catch (error){
    throw error;
  }
};

//check if user signs up with an existing username
middlewareObj.existingUser = async (req, res, next) => {
  try{
    const user = await User.findOne({name: req.body.name})
    if (user){
      res.status(400).json({
        message: "Username has been registered. Please sign in."
      })
    } else {
      next();
    }
  } catch (error) {
      throw error;
  }
};

//create user with mongodb
middlewareObj.createDBUser = async (req, res, next) => {
  try{
      if(req.body.password === req.body.confirmPassword){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const user = await User.create(req.body);
        req.newUser = user;
        next();
      } else {
        res.status(400).json({
          message: "Password confirmation is not identical as password"
        })
      }
  } catch(error) {
    throw error;
  }
};

//authenticate the user with mongodb
middlewareObj.authenticatedUser = async(req, res, next) => {
  try{
    const credentials = auth(req);
    console.log(credentials)
    if(credentials.name){
      const user = await User.findOne({name: credentials.name});
      if(user){
        const authenticated = bcrypt.compareSync(credentials.pass, user.password);
        if(authenticated){
          console.log('Successfully logged in');
          req.currentUser = user;
          next();
        } else {
          res.status(401).json({
            message: "Access denied."
          })
        }
      } else {
        res.status(401).json({
          message: "User does not exist. Please sign up."
        })
      }
    } else {
      res.status(400).json({
        message: "Please sign in."
      })
    }
  } catch(error){
    throw error;
  }
};
module.exports = middlewareObj;
