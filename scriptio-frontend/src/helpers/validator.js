import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export const validateCredentials = (email, password, checkPassword = true) => {
  const validation = {
    isValid: false,
    email: { isValid: true, alert: "" },
    password: { isValid: true, alert: "" },
  };

  if (!email) {
    validation.email.isValid = false;
    validation.email.alert = "Please enter an email";
  } else if (!isEmail(email)) {
    validation.email.isValid = false;
    validation.email.alert = "Please enter a valid email";
  }

  if (checkPassword) {
    if (!password) {
      validation.password.isValid = false;
      validation.password.alert = "Please enter a password";
    } else if (!isStrongPassword(password)) {
      validation.password.isValid = false;
      validation.password.alert =
        "Please enter a valid password\nYour password should contain at least:\n- 8 characters\n- 1 lowercase letter\n- 1 uppercase letter\n- 1 number\n- 1 special character";
    }
  }

  validation.isValid =
    validation.email.isValid && (!checkPassword || validation.password.isValid);
  return validation;
};
