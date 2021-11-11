import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecordValidation } from '../../utils/Validation';

const AddRecord = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('login-token')) {
      navigate('/addRecord');
    } else {
      navigate('/');
    }
  }, []);
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
  const [addData, setaddData] = useState(initialState);
  const [resultMsg, setResultMsg] = useState('');
  const [preview, setPreview] = useState();
  const [errors, setErrors] = useState({});
  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setaddData({ ...addData, [name]: value });
  };
  const handleImageUpload = (e) => {
    console.log('Image =>', e.target.files[0]);
    if (e.target.files[0].type.search('imgae/')) {
      setaddData({
        ...addData,
        myImg: e.target.files[0],
      });
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log('Image In Data', addData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { isvalid, errors } = addRecordValidation(addData);
    if (!isvalid) {
      setErrors(errors);
    } else {
      let formData = new FormData();
      formData.append('fname', addData.fname);
      formData.append('lname', addData.lname);
      formData.append('mob', addData.mob);
      formData.append('address', addData.address);
      formData.append('city', addData.city);
      formData.append('state', addData.state);
      formData.append('country', addData.country);
      formData.append('pin', addData.pin);
      formData.append('email', addData.email);
      formData.append('myImg', addData.myImg);
      const result = await axios.post(
        'http://localhost:9000/api/user/addUSerRoute',
        formData
      );
      console.log('Add Data', result);
    }
  };
  return (
    <>
      <div className='container col-md-4'>
        <h1 className='text-warning'>Add Record</h1>
        <h1>{resultMsg}</h1>
        <form onSubmit={onSubmit}>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>First Name</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='fname'
                onChange={onchangeHandle}
                value={addData.fname}
                placeholder='First Name'
                className='form-control'
              />
              {}
              {errors && errors.fname && !addData.fname && (
                <span className='text-danger'>{errors.fname}</span>
              )}
            </div>
          </div>

          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Last Name</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='lname'
                onChange={onchangeHandle}
                value={addData.lname}
                placeholder='Last Name'
                className='form-control'
              />
              {errors && errors.lname && !addData.lname && (
                <span className='text-danger'>{errors.lname}</span>
              )}
            </div>
          </div>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Mobile</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='mob'
                onChange={onchangeHandle}
                value={addData.mob}
                placeholder='email@example.com'
                className='form-control'
              />
              {errors && errors.mob && (
                <span className='text-danger'>{errors.mob}</span>
              )}
            </div>
          </div>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Address</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='address'
                onChange={onchangeHandle}
                value={addData.address}
                placeholder='email@example.com'
                className='form-control'
              />
              {errors && errors.address && (
                <span className='text-danger'>{errors.address}</span>
              )}
            </div>
          </div>

          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>City</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='city'
                onChange={onchangeHandle}
                value={addData.city}
                placeholder='email@example.com'
                className='form-control'
              />
              {errors && errors.city && (
                <span className='text-danger'>{errors.city}</span>
              )}
            </div>
          </div>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>State</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='state'
                onChange={onchangeHandle}
                value={addData.state}
                placeholder='email@example.com'
                className='form-control'
              />
              {errors && errors.state && (
                <span className='text-danger'>{errors.state}</span>
              )}
            </div>
          </div>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Country</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='country'
                onChange={onchangeHandle}
                value={addData.country}
                placeholder='email@example.com'
                className='form-control'
              />
              {errors && errors.country && (
                <span className='text-danger'>{errors.country}</span>
              )}
            </div>
          </div>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Pin</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='pin'
                onChange={onchangeHandle}
                value={addData.pin}
                placeholder='email@example.com'
                className='form-control'
              />
              {errors && errors.pin && (
                <span className='text-danger'>{errors.pin}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Email</label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='email'
                onChange={onchangeHandle}
                value={addData.email}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Upload Image</label>
            <div class='col-sm-10'>
              <input
                type='file'
                name='myImg'
                onChange={handleImageUpload}
                class='form-control'
                accept='.png, .jpg, .jpeg'
              />
              {/* {preview ? <img src={preview} alt='sdfsd' /> : ''} */}
            </div>
          </div>
          <button type='submit' className=' btn btn-danger'>
            Add Record
          </button>
        </form>
      </div>
    </>
  );
};
export default AddRecord;
