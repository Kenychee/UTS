const { attempt } = require('joi');
const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

const loginAttempts = new Map();

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    // if login attempt failed > 5
    if (loginAttemptLimit(email)) {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many login attempts. Please try again later.', { timestamp: getCurrentDateTime() }
      );
    }

    // if login unsucced < 5
    if (!loginSuccess) {
      failedLoginAttempts(email);
      
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password.', { timestamp: getCurrentDateTime(), attemptCount: loginAttempts.get(email).count }
      );
    }

    // If succeds, reset login attempt count
    loginAttempts.delete(email);

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

/**
 * To check if the login attempt >= 5
 * @param {string} email - user's email
 * @param {boolean} - True if attempt >= 5
 */
function loginAttemptLimit(email) {
  const attempt = loginAttempts.get(email) || { count: 0, timestamp: new Date() };
  return attempt.count >= 5;
}

/**
 * Increment login attempt count if login unsucced
 * @param {string} email - user's email
 */
function failedLoginAttempts(email) {
  const attempt = loginAttempts.get(email) || { count: 0, timestamp: new Date() };
  attempt.count += 1;
  attempt.timestamp = getCurrentDateTime(); // update timestampt for each login
  loginAttempts.set(email, attempt);

  // set time out if the login attempt >= 5 will reset after 30 minutes
  setTimeout(() => loginAttempts.delete(email), 30 * 60 * 1000);
}

/**
 * Get the date and time format
 * @param {string} - date and time format
 */
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  login,
};
