import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgetValidation } from '../../utils/Validation';
const ForgetPass = () => {
  const initialState = {
    email: '',
  };

  //   useEffect(() => {
  //     if (localStorage.getItem('login-token')) {
  //       navigate('/forgetPass');
  //     } else {
  //       navigate('/');
  //     }
  //   }, []);
  const [forgetData, setForgetData] = useState(initialState);
  const [resultMsg, setResultMsg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setForgetData({ ...forgetData, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // const { isvalid, errors } = forgetValidation(forgetData);
    // if (!isvalid) {
    //   setErrors(errors);
    // //} else {
    const { email } = forgetData;
    let info = { email };
    const result = await axios.post(
      'http://localhost:9000/api/user/forgetPswdRoute',
      info
    );
    if (result.data.code === 301) {
      toast.error(result.data.msg);
    }
    if (result.data.code === 200) {
      toast.success(result.data.msg);
    }
    //  }
  };
  return (
    <>
      <div className='container col-md-4'>
        <h1 className='text-warning'>User Login</h1>
        <h1>{resultMsg}</h1>
        <form onSubmit={onSubmit}>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Email</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='email'
                onChange={onchangeHandle}
                value={forgetData.email}
                placeholder='email@example.com'
                className='form-control'
              />
              {errors && errors.email && (
                <span className='text-danger'>{errors.email}</span>
              )}
            </div>
          </div>
          <button type='submit' className=' btn btn-danger'>
            Forget
          </button>
        </form>
      </div>
    </>
  );
};
export default ForgetPass;
