const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getAllUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
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

  const totalCount = await countUsers(filter);
  const totalPages = Math.ceil(totalCount / pageSize);
  const previousPage = pageNumber > 1;
  const nextPage = pageNumber < totalPages;

  const users = await usersRepository.getUsers(
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
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

/**
 * Count the number of users
 * @param {object} filter - Filter criteria
 * @retuns {Promise<number>} - Number of users
 */
async function countUsers(filter) {
  return User.countDocuments(filter);
}

module.exports = {
  getAllUsers,
  countUsers,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
