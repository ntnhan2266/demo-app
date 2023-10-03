import { isValidVietnamesePhoneNumber, isValidEmail, isValidContact } from '@/utils/validation';

describe('isValidVietnamesePhoneNumber', () => {
  test('returns true for a valid Vietnamese phone number', () => {
    const validPhoneNumber = '0987654321';
    expect(isValidVietnamesePhoneNumber(validPhoneNumber)).toBe(true);
  });

  test('returns false for an invalid Vietnamese phone number', () => {
    const invalidPhoneNumber = '12345';
    expect(isValidVietnamesePhoneNumber(invalidPhoneNumber)).toBe(false);
  });
});

describe('isValidEmail', () => {
  test('returns true for a valid email address', () => {
    const validEmail = 'test@example.com';
    expect(isValidEmail(validEmail)).toBe(true);
  });

  test('returns false for an invalid email address', () => {
    const invalidEmail = 'invalid-email';
    expect(isValidEmail(invalidEmail)).toBe(false);
  });
});

describe('isValidContact', () => {
  test('returns true for a valid Vietnamese phone number', () => {
    const validPhoneNumber = '0987654321';
    expect(isValidContact(validPhoneNumber)).toBe(true);
  });

  test('returns true for a valid email address', () => {
    const validEmail = 'test@example.com';
    expect(isValidContact(validEmail)).toBe(true);
  });

  test('returns false for an invalid input', () => {
    const invalidInput = '12345';
    expect(isValidContact(invalidInput)).toBe(false);
  });
});
