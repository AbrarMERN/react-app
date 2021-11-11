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
    myImg:null
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
    console.log("Image =>", e.target.files[0].mimeType)
    if(e.target.files[0].mimeType.search('imgae/'))
    setaddData({
      ...addData,
      myImg: e.target.files[0]
    });
    setPreview(URL.createObjectURL(e.target.files[0]))
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const { isvalid, errors } = addRecordValidation(addData);
    if (!isvalid) {
      setErrors(errors);
    } else {
      const { fname, lname, mob, address, city, state, country, pin, email,myImg } =
        addData;
      let info = new FormData()
       info.append('fname',addData.fname);
       info.append('lname',addData.lname);
       info.append('mob',addData.mob);
       info.append('address',addData.address);
       info.append('city',addData.city);
       info.append('state',addData.state);
       info.append('country',addData.country);
       info.append('pin',addData.pin);
       info.append('email',addData.email);
       info.append('myImg',addData.myImg);
      
      const result = await axios.post(
        'http://localhost:9000/addRecord/addUSerRoute',
        info
      );
      const { data } = result;
      const { msg, code } = data;
      if (result.data.code === 200) {
        alert('You Are Added Successfully');
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
        <h1 class='text-warning'>Add Record</h1>
        <h1>{resultMsg}</h1>
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
                value={addData.fname}
                placeholder='First Name'
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
                value={addData.lname}
                placeholder='Last Name'
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
                value={addData.mob}
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
                value={addData.address}
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
                value={addData.city}
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
                value={addData.state}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.state && (
                <span class='text-danger'>{errors.state}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              Country
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='country'
                onChange={onchangeHandle}
                value={addData.country}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.country && (
                <span class='text-danger'>{errors.country}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              Pin
            </label>
            <div class='col-sm-10'>
              <input
                type='text'
                name='pin'
                onChange={onchangeHandle}
                value={addData.pin}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.pin && (
                <span class='text-danger'>{errors.pin}</span>
              )}
            </div>
          </div>
          <div class='mb-3 row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Email
            </label>
            <div class='col-sm-10'>
              <input
                type='password'
                name='email'
                onChange={onchangeHandle}
                value={addData.email}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div>
            <div class='col-sm-10'>
              <input
                type='file'
                name='myImg'
                onChange={handleImageUpload}
                
                class='form-control'
                id='inputPassword'
              />
              {preview ? <img src={preview} alt="sdfsd" />:''}
              {errors && errors.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div>
          </div>
          <button type='submit' class=' btn btn-danger'>
            Add Record
          </button>
        </form>
      </div>
    </>
  );
};
export default AddRecord;
