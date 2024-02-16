const router = require('express').Router();
const jwt = require('jsonwebtoken');
const TodosController = require('../controllers/todos');
const asyncWrapper = require('../lib/async-wrapper');
const Todos = require('../models/todo');
const Users = require('../models/user');

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
router.use(async (req, res, next) => {
  const { authorization } = req.headers;
  const token = jwt.verify(authorization, 'o8moo12');
  const user = await Users.getUserById(token.id).exec();
  console.log({ token });
  req.user = user;
  next();
});
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const skip = parseInt(req.query.skip) || 0;
  const status = req.query.status || null;

  const todos = status
    ? await Todos.find({ status }).limit(limit).skip(skip)
    : await Todos.find().limit(limit).skip(skip);
  res.json(todos);
});

// router.get('/users/:userId/todos', async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     const todos = await TodosController.getTodosByUserId(userId);
//     res.json(todos);
//   } catch (error) {
//     next(error);
//   }
// });
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await TodosController.getTodoById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
});
router.get('/users/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const [userErr, user] = await asyncWrapper(TodosController.getUserById(userId));

    if (userErr) {
      console.error('Error while fetching user by ID:', userErr);
      return next(userErr);
    }

    if (!user) {
      return res.status(404).json({ error: `User with ID ${userId} not found` });
    }

    const [todosErr, todos] = await asyncWrapper(TodosController.getTodosByUserId(userId));

    if (todosErr) {
      return next(todosErr);
    }

    res.json(todos);
  } catch (error) {
    console.error('Unexpected error:', error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.createTodo(req.body));

  if (!err) {
    return res.json(todo);
  }

  return next(err);
});

router.delete('/', async (req, res, next) => {
  const [err, deletedCount] = await asyncWrapper(
    TodosController.deleteAllTodos(),
  );

  if (!err) {
    console.log('All documents deleted successfully.', deletedCount);
    return res.json(`Deleted Count: ${deletedCount}`);
  }

  return next(err);
});

router.delete('/:id', async (req, res, next) => {
  const [findErr, requiredTodo] = await asyncWrapper(
    TodosController.getTodoById(req.params.id),
  );

  if (findErr) {
    return next(findErr);
  }

  if (!requiredTodo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (!TodosController.validateTodoOwner(requiredTodo.userId, req.user._id)) {
    return next(new CustomError('Un_Authorized', 401));
  }

  const [deleteErr, deletedCount] = await asyncWrapper(
    TodosController.deleteOne(req.params.id),
  );

  if (deleteErr) {
    return next(deleteErr);
  }

  res.json({ 'Deleted Count': deletedCount, requiredTodo });
});

router.patch('/:id', async (req, res) => {
  const [err, selectedTodo] = await asyncWrapper(
    TodosController.findById(req.params.id),
  );

  if (!err) {
    if (!selectedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const title = req.query.title || selectedTodo.title;
    const todoStatus = req.query.status || selectedTodo.status;

    // Create a controller for updateOne
    const updateResult = await Todos.updateOne(
      { _id: req.params.id },
      { title, status: todoStatus },
    );

    console.log(`Todo updated: ${title}, ${todoStatus}`);
    return res.json(updateResult);
  }

  return next(err);
});
// router.delete('/:id', async (req, res) => {
//   const [err, deletedCount] = await asyncWrapper(
//     TodosController.deleteOne(req.params.id),
//   );

//   if (!err) {
//     console.log('Document deleted successfully.', deletedCount);
//     return res.json(`Deleted Count: ${deletedCount}`);
//   }

//   return next(err);
// });
module.exports = router;
