import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidation } from '../../utils/Validation';
const LoginForm = () => {
  const initialState = {
    email: '',
    pswd: '',
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('login-token')) {
      // console.log('token', localStorage.getItem('login-token'));
      navigate('/userList');
    }
  }, []);
  const [loginData, setLoginData] = useState(initialState);
  const [resultMsg, setResultMsg] = useState('');
  const [errors, setErrors] = useState({});

  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { isvalid, errors } = loginValidation(loginData);
    if (!isvalid) {
      setErrors(errors);
    } else {
      const { email, pswd, uname } = loginData;
      let info = { email, pswd, uname };
      const result = await axios.post(
        'http://localhost:9000/api/user/logInRoute',
        info
      );
      const { data } = result;
      const { msg, code, token } = data;
      if (result.data.code === 200) {
        localStorage.setItem('login-token', token);
        alert('You Are Successfully Login');
        navigate('/userList');
      }
      console.log(result);
      setResultMsg(result.data.msg);
      if (result.data.code === 302) {
        return alert(result.data.msg);
      }
      if (result.data.code === 301) {
        return alert(result.data.msg);
      }
    }
  };
  return (
    <>
      <div class='container col-md-4'>
        <h1 class='text-warning'>User Login</h1>
        <h1>{resultMsg}</h1>
        <form onSubmit={onSubmit}>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Email</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='email'
                onChange={onchangeHandle}
                value={loginData.email}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Password</label>
            <div class='col-sm-10'>
              <input
                type='password'
                name='pswd'
                onChange={onchangeHandle}
                value={loginData.pswd}
                class='form-control'
                id='inputPassword'
              />
            </div>
          </div>
          <button type='submit' class=' btn btn-danger'>
            Login
          </button>
        </form>
        <Link to='/userRegister'>Register</Link>
        <br />
        <Link to='/forgetPass'>Forget Password</Link>
      </div>
    </>
  );
};
export default LoginForm;
