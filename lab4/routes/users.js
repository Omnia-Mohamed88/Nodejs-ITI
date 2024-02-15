const router = require('express').Router();
const UsersController = require('../controllers/users');
const asyncWrapper = require('../lib/async-wrapper');

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
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UsersController.getUserByUsername(username);

  if (user) {
    const valid = await user.verifyPassword(password);
    return res.json({ valid });
  }

  return res.status(404).json({ error: 'User not found' });
});

module.exports = router;
