import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';
import { editValidation } from '../../utils/Validation';
const EditRecord = () => {
  let { data } = useParams();
  console.log('sgdhghsdfh', data);
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
    myImg: null,
  };

  useEffect(() => {
    if (localStorage.getItem('login-token')) {
      navigate('/editRecord');
    } else {
      navigate('/');
    }
  }, []);
  //   const [getEditData, getEditData] = useState('');
  const [editData, seteditData] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    seteditData({ ...editData, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { isvalid, errors } = editValidation(editData);
    if (!isvalid) {
      setErrors(errors);
    } else {
      let formData = new FormData();
      formData.append('fname', editData.fname);
      formData.append('lname', editData.lname);
      formData.append('mob', editData.mob);
      formData.append('address', editData.address);
      formData.append('city', editData.city);
      formData.append('state', editData.state);
      formData.append('country', editData.country);
      formData.append('pin', editData.pin);
      formData.append('email', editData.email);
      formData.append('myImg', editData.myImg);
      const result = await axios.get(
        'http://localhost:9000/api/user/editUserRoute/',
        formData
      );
    }
  };
  useEffect(() => {
    getRecordById();
  }, []);
  alert(data);
  const getRecordById = async () => {
    const result = await axios.get(
      'http://localhost:9000/api/user/getUserByIdRoute'
    );
    console.log('Get Result ', result);
  };
  return (
    <>
      <div class='container col-md-4'>
        <h1 class='text-warning'>User Login</h1>
        <h1>{resultMsg}</h1>
        <form onSubmit={onSubmit}>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>First Name</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='fname'
                onChange={onchangeHandle}
                value={editData.fname}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.fname && (
                <span class='text-danger'>{errors.fname}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Last Name</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='lname'
                onChange={onchangeHandle}
                value={editData.lname}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.lname && (
                <span class='text-danger'>{errors.lname}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Mobile</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='mob'
                onChange={onchangeHandle}
                value={editData.mob}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.mob && (
                <span class='text-danger'>{errors.mob}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Address</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='address'
                onChange={onchangeHandle}
                value={editData.address}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.address && (
                <span class='text-danger'>{errors.address}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>City</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='city'
                onChange={onchangeHandle}
                value={editData.city}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.city && (
                <span class='text-danger'>{errors.city}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>State</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='state'
                onChange={onchangeHandle}
                value={editData.state}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.state && (
                <span class='text-danger'>{errors.state}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Country</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='country'
                onChange={onchangeHandle}
                value={editData.country}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.country && (
                <span class='text-danger'>{errors.country}</span>
              )}
            </div>
          </div>

          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Pin</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='pin'
                onChange={onchangeHandle}
                value={editData.pin}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.pin && (
                <span class='text-danger'>{errors.pin}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Email</label>
            <div class='col-sm-10'>
              <input
                type='password'
                name='email'
                onChange={onchangeHandle}
                value={editData.email}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div>
          </div>
          <button type='submit' class=' btn btn-danger'>
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default EditRecord;
