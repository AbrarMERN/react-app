export const loginValidation = (values) => {
  let isvalid = true,
    errors = {};
  let checkEmail = /^[A-Za-z0-9]{3,}@[A-Za-z0-9]{3,}[.]{1}[A-Za-z]{2,6}$/;
  if (!values.email) {
    isvalid = false;
    errors.email = 'Email Is Required';
  }
  if (!checkEmail.test(values.email)) {
    isvalid = false;
    errors.email = 'Email Is Inavalid';
  }
  return { isvalid, errors };
};

export const registerValidation = (values) => {
  let isvalid = true,
    errors = {};
  let checkEmail = /^[A-Za-z0-9]{3,}@[A-Za-z0-9]{3,}[.]{1}[A-Za-z]{2,6}$/;
  if (!values.fname) {
    isvalid = false;
    errors.fname = 'First Name Is Required';
  }
  if (!values.lname) {
    isvalid = false;
    errors.lname = 'Last Name Is Required';
  }
  if (!values.mob) {
    isvalid = false;
    errors.mob = 'Mobile Is Required';
  }
  if (!values.addree) {
    isvalid = false;
    errors.addree = 'Address Is Required';
  }
  if (!values.city) {
    isvalid = false;
    errors.city = 'City Is Required';
  }
  if (!values.state) {
    isvalid = false;
    errors.state = 'State Is Required';
  }
  if (!values.pin) {
    isvalid = false;
    errors.pin = 'Pin Is Required';
  }
  if (!values.email) {
    isvalid = false;
    errors.email = 'Email Is Required';
  }
  if (!checkEmail.test(values.email)) {
    isvalid = false;
    errors.email = 'Email Is Not Valid';
  }
  return { isvalid, errors };
};
