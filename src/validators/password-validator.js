export const isStrongPassword = function (value) {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])(?=\S)(?!.*\s).{8,20}$/;

  if (
    typeof value !== 'string' ||
    value.length < 8 ||
    value.length > 20 ||
    !regex.test(value)
  ) {
    throw new Error(
      'Password must be 8-20 characters long, include uppercase, lowercase, number, special character, and no spaces',
    );
  }

  return true;
};
