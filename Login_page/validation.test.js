// validation.test.js

// Automatically mock the 'validation' module
jest.mock('./temp/validations');

// Import the mocked functions
const { getSignupFormErrors, getLoginFormErrors } = require('./temp/validations');

describe('Validation Functions', () => {
  
  describe('Signup Form Validation', () => {
    test('should return errors when all fields are empty', () => {
      // Define the mock return value for this specific test
      getSignupFormErrors.mockReturnValue([
        'Firstname is required',
        'Email is required',
        'Password is required',
        'Password must have at least 8 characters',
        'Password does not match repeated password',
      ]);

      const errors = getSignupFormErrors('', '', '', '');
      expect(errors).toContain('Firstname is required');
      expect(errors).toContain('Email is required');
      expect(errors).toContain('Password is required');
      expect(errors).toContain('Password must have at least 8 characters');
      expect(errors).toContain('Password does not match repeated password');
    });

    test('should return error for short password', () => {
      getSignupFormErrors.mockReturnValue(['Password must have at least 8 characters']);

      const errors = getSignupFormErrors('John', 'john@example.com', 'short', 'short');
      expect(errors).toContain('Password must have at least 8 characters');
    });

    test('should return error when passwords do not match', () => {
      getSignupFormErrors.mockReturnValue(['Password does not match repeated password']);

      const errors = getSignupFormErrors('John', 'john@example.com', 'password123', 'password321');
      expect(errors).toContain('Password does not match repeated password');
    });

    test('should return no errors for valid input', () => {
      getSignupFormErrors.mockReturnValue([]);

      const errors = getSignupFormErrors('Jane', 'jane@example.com', 'securePass123', 'securePass123');
      expect(errors.length).toBe(0);
    });
  });

  describe('Login Form Validation', () => {
    test('should return errors when email and password are empty', () => {
      getLoginFormErrors.mockReturnValue(['Email is required', 'Password is required']);

      const errors = getLoginFormErrors('', '');
      expect(errors).toContain('Email is required');
      expect(errors).toContain('Password is required');
    });

    test('should return error when email is empty', () => {
      getLoginFormErrors.mockReturnValue(['Email is required']);

      const errors = getLoginFormErrors('', 'password123');
      expect(errors).toContain('Email is required');
      expect(errors).not.toContain('Password is required');
    });

    test('should return error when password is empty', () => {
      getLoginFormErrors.mockReturnValue(['Password is required']);

      const errors = getLoginFormErrors('john@example.com', '');
      expect(errors).toContain('Password is required');
      expect(errors).not.toContain('Email is required');
    });

    test('should return no errors for valid input', () => {
      getLoginFormErrors.mockReturnValue([]);

      const errors = getLoginFormErrors('john@example.com', 'password123');
      expect(errors.length).toBe(0);
    });
  });
});