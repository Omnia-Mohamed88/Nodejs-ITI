const router = require('express').Router();
const jwt = require('jsonwebtoken');
const UsersController = require('../controllers/users');
const TodosController = require('../controllers/todos');
const asyncWrapper = require('../lib/async-wrapper');
const Users = require('../models/user');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UsersController.getUserByUsername(username);

  if (user) {
    const valid = await user.verifyPassword(password);
    return res.json({ token });
  }

  return res.status(404).json({ error: 'User not found' });
});
router.get('/', async (req, res) => {
  const users = await UsersController.getAllUsers(); // Use getAllUsers instead of find
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const [err, user] = await asyncWrapper(
    UsersController.getUserById(req.params.id),
  );

  if (!err) {
    return res.json(user);
  }

  return next(err);
});

router.delete('/', async (req, res, next) => {
  const [err, deletedCount] = await asyncWrapper(
    UsersController.deleteAllUsers(),
  );

  if (!err) {
    console.log('All documents deleted successfully.', deletedCount);
    return res.json(deletedCount);
  }

  return next(err);
});

router.post('/', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.createUser(req.body));

  if (!err) {
    console.log('USER', user);
    return res.json(user);
  }

  return next(err);
});

router.delete('/:id', async (req, res, next) => {
  const userId = req.params.id;

  try {
    const deletedCount = await UsersController.deleteUserById(userId);

    if (deletedCount > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await UsersController.findOne({ username });

//   if (user) {
//     const valid = await user.verifyPassword(password);
//     return res.json({ valid });
//   }

//   return res.status(404).json({ error: 'User not found' });
// });.

router.get('/:userId/todos', async (req, res, next) => {
  const { userId } = req.params;
  const [err, todos] = await asyncWrapper(TodosController.find({ userId }));
  if (!err) {
    return res.json({ todos });
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const [findErr, selectedUser] = await asyncWrapper(
      UsersController.findById(userId),
    );

    if (findErr) {
      return next(findErr);
    }

    if (!selectedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const username = updatedUserData.username || selectedUser.username;
    const firstName = updatedUserData.firstName || selectedUser.firstName;
    const lastName = updatedUserData.lastName || selectedUser.lastName;
    const dob = updatedUserData.dob || selectedUser.dob;

    const updateResult = await UsersController.updateUser(userId, {
      username,
      firstName,
      lastName,
      dob,
    });

    if (updateResult) {
      res.json({
        message: 'User was updated successfully',
        updatedUser: updateResult,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
