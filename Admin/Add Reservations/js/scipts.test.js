// scripts.test.js

const {
    formatDate,
    addThirtyDays,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    // Add other functions as needed
  } = require('./scripts');
  
  describe('Date Formatting and Manipulation', () => {
    
    test('formatDate should format Date object to YYYY-MM-DD', () => {
      const date = new Date(2023, 0, 5); // January 5, 2023
      expect(formatDate(date)).toBe('2023-01-05');
    });
  
    test('formatDate should add leading zeros', () => {
      const date = new Date(2023, 9, 9); // October 9, 2023
      expect(formatDate(date)).toBe('2023-10-09');
    });
  
    test('addThirtyDays should add exactly 30 days to a date', () => {
      const originalDate = new Date(2023, 0, 1); // January 1, 2023
      const newDate = addThirtyDays(originalDate);
      const expectedDate = new Date(2023, 0, 31); // January 31, 2023
      expect(newDate.toDateString()).toBe(expectedDate.toDateString());
    });
  
    test('addThirtyDays should handle month boundaries', () => {
      const originalDate = new Date(2023, 0, 15); // January 15, 2023
      const newDate = addThirtyDays(originalDate);
      const expectedDate = new Date(2023, 1, 14); // February 14, 2023
      expect(newDate.toDateString()).toBe(expectedDate.toDateString());
    });
  
    test('getFirstDayOfMonth should return the first day of the month', () => {
      const year = 2023;
      const month = 4; // May
      const firstDay = getFirstDayOfMonth(year, month);
      expect(firstDay.toDateString()).toBe('Mon May 01 2023');
    });
  
    test('getLastDayOfMonth should return the last day of the month', () => {
      const year = 2023;
      const month = 1; // February
      const lastDay = getLastDayOfMonth(year, month);
      expect(lastDay.toDateString()).toBe('Tue Feb 28 2023');
    });
  
    test('getLastDayOfMonth should handle leap years', () => {
      const year = 2024;
      const month = 1; // February
      const lastDay = getLastDayOfMonth(year, month);
      expect(lastDay.toDateString()).toBe('Thu Feb 29 2024');
    });
  
  });