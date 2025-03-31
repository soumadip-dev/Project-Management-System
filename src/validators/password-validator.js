export const isStrongPassword = function (password) {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])(?=\S)(?!.*\s).{8,20}$/;
  if (password.length >= 8 && password.length <= 20 && regex.test(password)) {
    return true;
  } else {
    return false;
  }
};
