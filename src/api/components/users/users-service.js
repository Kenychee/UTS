const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get user by email
 * @param {string} email - email of the user
 * @returns {Promise<object|null>} - resolves to the user object if found, or null if not
 */
async function getUserByEmail(email) {
  return await usersRepository.getUserByEmail(email);
}

/**
 * Get a list of users
 * @param {object} params - Pagination and filter parameters
 * @return {Promise<object>} contain paginated user data
 */
async function getUsers(params) {
  let { pageNumber = 1, pageSize = 10, sort, search } = params;

  pageNumber = parseInt(pageNumber);
  pageSize = parseInt(pageSize);

  const filter = {};
  if (search) {
    const [field, key] = search.split(':');
    filter[field] = { $regex: new RegExp(key, 'i') }; //case-insensitive regex search
  }

  let sortOption = { email: 'asc' };
  if (sort) {
    const [field, order] = sort.split(':');
    sortOption = { [field]: order === 'desc' ? -1 : 1 }; //-1 untuk desc dan 1 untuk asc
  }

  const totalCount = await usersRepository.countUsers(filter);
  const totalPages = Math.ceil(totalCount / pageSize);
  const previousPage = pageNumber > 1;
  const nextPage = pageNumber < totalPages;

  const users = await usersRepository.getAllUsers(
    filter,
    sortOption,
    pageNumber,
    pageSize
  );

  return {
    page_number: pageNumber,
    page_size: pageSize,
    count: users.length,
    total_pages: totalPages,
    previous_page: previousPage,
    next_page: nextPage,
    data: users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    })),
  };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getUserByEmail,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
