import React from 'react';
import { useState } from 'react';
import { registerValidation } from '../../utils/Validation';
const RegisterForm = () => {
  const initialState = {
    fname: '',
    lname: '',
    mob: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pin: '',
    email: '',
    myImg: '',
  };
  const [registerData, setRegisterData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { isvalid, errors } = registerValidation(registerData);
    if (!isvalid) {
      setErrors(errors);
    } else {
      let data = { registerData };
    }
  };
  return (
    <>
      <div class='container col-md-4'>
        <h1 class='text-warning'>User Login</h1>
        <form onSubmit={onSubmit}>
          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              First Name
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='fname'
                onChange={onchangeHandle}
                value={registerData.email}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.fname && (
                <span class='text-danger'>{errors.fname}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              Last Name
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='lname'
                onChange={onchangeHandle}
                value={registerData.email}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.lname && (
                <span class='text-danger'>{errors.lname}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              Mobile
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='mob'
                onChange={onchangeHandle}
                value={registerData.mob}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.mob && (
                <span class='text-danger'>{errors.mob}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              Address
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='address'
                onChange={onchangeHandle}
                value={registerData.address}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.address && (
                <span class='text-danger'>{errors.address}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              City
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='city'
                onChange={onchangeHandle}
                value={registerData.city}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.city && (
                <span class='text-danger'>{errors.city}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              State
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='state'
                onChange={onchangeHandle}
                value={registerData.state}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.state && (
                <span class='text-danger'>{errors.state}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Country
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='country'
                onChange={onchangeHandle}
                value={registerData.pswd}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.country && <span>{errors.country}</span>}
            </div>
          </div>
          <div class='mb-3 row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Pin
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='pin'
                onChange={onchangeHandle}
                value={registerData.pin}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.pin && <span>{errors.pin}</span>}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Email
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='email'
                onChange={onchangeHandle}
                value={registerData.email}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.email && <span>{errors.email}</span>}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Pin
            </label>
            <div class='col-sm-10'>
              <input
                type='file'
                name='myImg'
                onChange={onchangeHandle}
                value={registerData.myImg}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.myImg && <span>{errors.myImg}</span>}
            </div>
          </div>
          <button type='submit' class=' btn btn-danger'>
            Register
          </button>
        </form>
      </div>
    </>
  );
};
export default RegisterForm;
