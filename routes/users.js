const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const Chatkit = require('@pusher/chatkit-server');
require('dotenv').config();

const middleware = require('../middleware');

//use bodyParser middleware bundled with Express
router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));

//Handler function to wrap each route
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

const chatkit = new Chatkit.default({
  instanceLocator: process.env.INSTANCE_LOCATOR,
  key: process.env.KEY,
});

//create new user
router.post('/', middleware.validateUserInfo, middleware.existingUser, middleware.createDBUser, asyncHandler(async (req, res, next) => {
  try {
      const user = await chatkit.createUser({
        id: req.newUser.id,
        name: req.newUser.name
      })
      res.location('/');
      res.status(201).end();
  } catch (error) {
    throw error;
  }
}));

//authenticate user
router.get('/', middleware.authenticatedUser, asyncHandler((req, res, next) => {
    const user = req.currentUser;
    res.status(200).json({
      user: user
    })
}));

//request token
router.post('/auth', asyncHandler(async (req, res) => {
    const authData = await chatkit.authenticate({
      userId: req.query.user_id
    });
    res.status(authData.status)
       .send(authData.body);
}));

module.exports = router;
