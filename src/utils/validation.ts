export const isValidVietnamesePhoneNumber = (phoneNumber: string): boolean => {
  // Regular expression for Vietnamese phone number validation
  const vietnamesePhoneNumberRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/;
  return vietnamesePhoneNumberRegex.test(phoneNumber);
};

export const isValidEmail = (email: string): boolean => {
  // Regular expression for email validation
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return emailRegex.test(email);
};

export const isValidContact = (input: string): boolean => {
  // Check if the input contains only numeric characters
  if (/^\d+$/.test(input)) {
    // If it's a valid Vietnamese phone number
    return isValidVietnamesePhoneNumber(input);
  }

  // If it's a valid email address
  return isValidEmail(input);
};
