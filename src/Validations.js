const required = (message = "This field is required.") => value => {
  if (value === null || value === undefined || value === "") {
    return message;
  }
};

const email = (message = "Please enter a valid email.") => value => {
  if (value && !value.toString().match(/(.+)@(.+)\.(.+)/)) {
    return message;
  }
};

const number = (message = "Please enter valid number.") => value => {
  if (value !== null && value !== undefined && value !== "" && isNaN(value)) {
    return message;
  }
};

export default { required, email, number };
