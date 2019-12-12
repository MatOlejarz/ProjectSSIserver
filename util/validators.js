const isValidEmail = email => {
  const emailPatternRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(emailPatternRegExp)) {
    return true;
  } else {
    return false;
  }
};

const isEmpty = string => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

exports.validateSignupData = data => {
  let errors = {};

  // Email validation
  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isValidEmail(data.email)) {
    errors.email = "The entered value is not a valid email";
  }
  // Password validation
  if (isEmpty(data.password)) {
    errors.password = "Password must not be empty";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  // Username validation
  if (isEmpty(data.handle)) {
    errors.handle = "Username must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};

  // Email validation
  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  }
  // Password validation
  if (isEmpty(data.password)) {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = data => {
  let userDetails = {};

  // Check if user has description
  if (!isEmpty(data.bio.trim())) {
    userDetails.bio = data.bio;
  }
  // Check if user has website
  if (!isEmpty(data.website.trim())) {
    // Check if correct format is used, if no set it
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }
  // Check if user has location
  if (!isEmpty(data.location.trim())) {
    userDetails.location = data.location;
  }

  return userDetails;
};
