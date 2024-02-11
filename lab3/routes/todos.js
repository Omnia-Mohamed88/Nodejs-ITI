const express = require('express');

const router = express.Router();
const TodosController = require('../controllers/todos');

router.param('id', (req, res, next, id) => {
  const validatedId = parseInt(id);

  if (isNaN(validatedId) || validatedId <= 0) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }// status 400 means that the server will not process the request

  // bec validated id is needed further on.
  req.validatedId = validatedId;

  next();
});

// GET all todos
router.get('/', (req, res) => {
  const todos = TodosController.getAll();
  const status = req.query;
  if (status && ['to-do', 'in-progress', 'done'].includes(status)) {
    const filteredTodos = todos.filter((todo) => todo.status === status);
    res.status(200).render('index', { list: filteredTodos });
  } else {
    res.status(200).render('index', { list: todos });
    // render all todos instead
  }
});

// GET todo by id
router.get('/:id', (req, res) => {
  const id = req.validatedId; // Use the validated id from req
  const todo = TodosController.getById(id);

  if (todo) {
    res.status(200).render('index', { list: [todo] });
  } else {
    res.status(404).json({ error: 'Todo not found' });
    // notfound
  }
});

// DELETE todo by id
router.delete('/:id', (req, res) => {
  const id = req.validatedId; // Use the validated id from req
  const todo = TodosController.getById(id);

  if (todo) {
    TodosController.deleteById(id);
    const updatedTodos = TodosController.getAll();
    res.status(200).render('index', { list: updatedTodos });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// PATCH todo by id
router.patch('/:id', (req, res) => {
  const id = req.validatedId; // Use the validated id from req
  const updatedTodo = req.body;

  if (updatedTodo.status && ['to-do', 'in-progress', 'done'].includes(updatedTodo.status)) {
    const success = TodosController.updateById(id, updatedTodo);

    if (success) {
      const updatedTodos = TodosController.getAll();
      res.status(200).render('index', { list: updatedTodos });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } else {
    res.status(400).json({ error: 'Invalid status for update' });
  }
});

// POST a new todo
router.post('/', (req, res) => {
  const newTodo = { ...req.body, status: 'to-do' }; // Add default status 'to-do'

  if (!newTodo.title || !newTodo.status) {
    return res.status(400).json({ error: 'Title and status are required for a new todo' });
  }

  const createdTodo = TodosController.createTodo(newTodo);
  return res.json(createdTodo);
});

module.exports = router;
