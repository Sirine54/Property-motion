export const checkPasswordConditions = (pwd: string) => {
  return {
    minLength: pwd.length >= 8,
    hasUpperCase: /[A-Z]/.test(pwd),
    hasLowerCase: /[a-z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
    hasSpecialChar: /[^a-zA-Z0-9]/.test(pwd),
    noForbiddenChars: !/[`'"\\;|<>$]/.test(pwd),
  };
};
