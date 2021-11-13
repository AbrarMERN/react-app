import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetValidation } from '../../utils/Validation';
const ResetPass = () => {
  const initialState = {
    pswd: '',
    confPswd: '',
  };
  let query = window.location.search;
  //   let item = part.split('=');
  //   resultval[item[0]] = decodeURIComponent(item[1]);
  //   const { key } = useParams();
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (localStorage.getItem('login-token')) {
  //       // console.log('token', localStorage.getItem('login-token'));
  //       navigate('/userList');
  //     }
  //   }, []);
  const [resetData, setResetData] = useState(initialState);
  const [resultMsg, setResultMsg] = useState('');
  const [errors, setErrors] = useState({});

  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });
  };
  const { key } = useParams();
  const onSubmit = async (e) => {
    e.preventDefault();
    // toast.success('How Are You Friend');
    const { isvalid, errors } = resetValidation(resetData);
    if (!isvalid) {
      setErrors(errors);
    } else {
      const { pswd, confPswd } = resetData;
      let info = { pswd, confPswd };
      const result = await axios.post(
        `http://localhost:9000/api/user/resetPswdRoute/${key}`,
        info
      );
      if (result.data.code === 200) {
        toast.success(result.data.msg);
        navigate('/');
      }
      console.log('Result sdkhsdfhjh', result);
      setResultMsg(result.data.msg);
      if (result.data.code === 301) {
        toast.error(result.data.msg);
      }
      if (result.data.code === 302) {
        toast.error(result.data.msg);
      }
      if (result.data.code === 303) {
        toast.error(result.data.msg);
      }
    }
  };
  return (
    <>
      <div class='container col-md-4'>
        <h1 class='text-warning'>Reset Password</h1>
        <h1>{resultMsg}</h1>
        <form onSubmit={onSubmit}>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Password</label>
            <div class='col-sm-10'>
              <input
                type='password'
                name='pswd'
                onChange={onchangeHandle}
                value={resetData.pswd}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.pswd && (
                <span class='text-danger'>{errors.pswd}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>ConFirm Password</label>
            <div class='col-sm-10'>
              <input
                type='password'
                name='confPswd'
                onChange={onchangeHandle}
                value={resetData.confPswd}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.confPswd && (
                <span class='text-danger'>{errors.confPswd}</span>
              )}
            </div>
          </div>
          <button type='submit' class=' btn btn-danger'>
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};
export default ResetPass;
