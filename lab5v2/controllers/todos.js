const Todos = require('../models/todo');

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const createTodo = async (todo) => {
  try {
    const newTodo = await Todos.create(todo);
    return newTodo;
  } catch (err) {
    console.log('ERROR: When creating a new Todo');
    throw new CustomError(err.message, 422);
  }
};

const getAllTodos = async () => {
  const todos = await Todos.find().exec();
  return todos;
};

const getTodoById = async (id) => {
  const todo = await Todos.findById(id);
  return todo;
};

const deleteTodoById = async (id) => {
  const result = await Todos.deleteOne({ _id: id });
  return result.deletedCount;
};

const deleteAllTodos = async () => {
  const result = await Todos.deleteMany({});
  return result.deletedCount;
};
const validateTodoOwner = (todoUserId, loggedUserId) => todoUserId.toString() === loggedUserId.toString();

const getTodosByUserId = async (userId, loggedUserId) => {
  try {
    if (!validateTodoOwner(userId, loggedUserId)) {
      throw new CustomError('Unauthorized access to todos', 403);
    }

    const todos = await Todos.find({ userId }).exec();
    return todos;
  } catch (error) {
    throw new CustomError(error.message, error.status || 500);
  }
};
const find = async (findCond, limit = 5, skip = 0) => {
  const todos = await Todos.find(findCond)
    .limit(limit)
    .skip(skip)
    .select({ title: 1, status: 1 })
    .populate('userId')
    .exec();

  return todos;
};

// const getTodosByUserId = async (userId) => {
//   const todos = await Todos.find({ userId }).exec();
//   return todos;
// };
// const getUserById = async (id) => {
//   const user = await Todos.findById(id);
//   return user;
// };
module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  deleteTodoById,
  deleteAllTodos,
  getTodosByUserId,
  // getUserById,
  validateTodoOwner,

};
