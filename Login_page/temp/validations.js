// __mocks__/validation.js

const getSignupFormErrors = jest.fn();
const getLoginFormErrors = jest.fn();
const users = []; // Mock users array if needed

module.exports = {
  getSignupFormErrors,
  getLoginFormErrors,
  users,
};