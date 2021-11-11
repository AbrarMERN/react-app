import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { registerValidation } from '../../utils/Validation';
const RegisterForm = () => {
  const navigate = useNavigate();
  const initialState = {
    uname: '',
    email: '',
    pswd: '',
    confPswd: '',
    mob: '',
  };

  const [registerData, setRegisterData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { isvalid, errors } = registerValidation(registerData);
      if (!isvalid) {
        setErrors(errors);
      } else {
        const { uname, email, pswd, confPswd, mob } = registerData;
        let regInfo = { uname, email, pswd, confPswd, mob };
        const result = await axios.post(
          'http://localhost:9000/api/user/signInRoute',
          regInfo
        );
        console.log('Register Detail', result);
        if (result.status === 200) {
          // window.location.href = '/addRecord';
          navigate('/addRecord');
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <div class='container col-md-4'>
        <h1 class='text-warning'>User Register</h1>
        <form onSubmit={onSubmit}>
          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              User Name
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='uname'
                onChange={onchangeHandle}
                value={registerData.uname}
                placeholder='User Name'
                class='form-control'
              />
              {errors && errors.uname && (
                <span class='text-danger'>{errors.uname}</span>
              )}
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
              {errors && errors.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Password
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='pswd'
                onChange={onchangeHandle}
                value={registerData.pswd}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.pswd && <span>{errors.pswd}</span>}
            </div>
          </div>

          <div class='mb-3 row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Confirm Password
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='confPswd'
                onChange={onchangeHandle}
                value={registerData.confPswd}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.confPswd && <span>{errors.confPswd}</span>}
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
                placeholder='Contact'
                class='form-control'
              />
              {errors && errors.mob && (
                <span class='text-danger'>{errors.mob}</span>
              )}
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
