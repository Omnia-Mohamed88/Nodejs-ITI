const Users = require('../models/user');
// const Todos = require('../models/todo');

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const createUser = async (user) => {
  try {
    const newUser = await Users.create(user);
    return newUser;
  } catch (err) {
    console.log('ERROR: When creating a new User');
    throw new CustomError(err.message, 422);// 422 means issue with data provided
  }
};

const getAllUsers = async () => {
  const users = await Users.find().exec();
  return users;
};// using exec to chain additional query or specifiy callbacks

const getUserById = async (id) => {
  const user = await Users.findById(id);
  return user;
};

const deleteUserById = async (id) => {
  const result = await Users.deleteOne({ _id: id });
  return result.deletedCount;
};

const deleteAllUsers = async () => {
  const result = await Users.deleteMany({});
  return result.deletedCount;
};

const getUserByUsername = async (username) => {
  const user = await Users.findOne({ username });
  return user;
};

const getTodosByUserId = async (userId) => {
  const todos = await Todos.find({ userId }).exec();
  return todos;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  deleteAllUsers,
  getUserByUsername,
  getTodosByUserId,
};
