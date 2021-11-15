import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { editValidation } from '../../utils/Validation';

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
const EditRecord = () => {
  let { data } = useParams();
  console.log('Data Id', data);

  useEffect(() => {
    if (!localStorage.getItem('login-token')) {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    if (data) {
      getRecordById(data);
    } else {
      navigate('/userList');
    }
  }, [data]);
  const [getEditData, setGetEditData] = useState({});
  const [preview, setPreview] = useState();
  const [resultMsg, setResultMsg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onchangeHandle = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setGetEditData({ ...getEditData, [name]: value });
  };
  const handleImageUpload = (e) => {
    console.log('Image =>', e.target.files[0]);
    if (e.target.files[0].type.search('imgae/')) {
      setGetEditData({
        ...getEditData,
        myImg: e.target.files[0],
      });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      alert('Please Choose Image File ');
    }
    console.log('Image In Data', getEditData);
  };
///get User By Id For Set In  Text field
  const getRecordById = async (id) => {
    const token = localStorage.getItem('login-token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const result = await axios.get(
      `http://localhost:9000/api/user/getUserByIdRoute/${id}`,
      config
    );
    console.log('Result of Get Id=>', result);
    console.log('Only Result Data=>', result.data);
    setGetEditData(result.data.data);
  };

//update User click on submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { isvalid, errors } = editValidation(getEditData);
    if (!isvalid) {
      setErrors(errors);
    } else {
      console.log('submit Id', data);
      const token = localStorage.getItem('login-token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log('tokennnnnnn', token);
      let formData = new FormData();
      formData.append('fname', getEditData.fname);
      formData.append('lname', getEditData.lname);
      formData.append('mob', getEditData.mob);
      formData.append('address', getEditData.address);
      formData.append('city', getEditData.city);
      formData.append('state', getEditData.state);
      formData.append('country', getEditData.country);
      formData.append('pin', getEditData.pin);
      formData.append('email', getEditData.email);
      formData.append('myImg', getEditData.myImg);
      const result = await axios.put(
        `http://localhost:9000/api/user/editUserRoute/${data}`,
        formData,
        config
        // { data: data }
      );
      if (result.data.code === 200) {
         toast.success(result.data.msg);
         navigate('/userList');
      }
      if (result.data.code === 400) {
         toast.error(result.data.msg);
      }
    }
  };

  return (
    <>
      <div class='container col-md-4'>
        {console.log({ getEditData })}
        <h1 class='text-warning'>Update Your Record</h1>
        <h1>{resultMsg}</h1>
        <form onSubmit={onSubmit}>
          <div class='mb-3 row'>
            <label class='col-sm-2 col-form-label'>Last Name</label>
            {console.log(getEditData)}
            <div class='col-sm-10'>
              <input
                type='text'
                name='fname'
                onChange={onchangeHandle}
                value={getEditData.fname}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.fname && !getEditData.fname && (
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
                value={getEditData.lname}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.lname && !getEditData.lname && (
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
                value={getEditData.mob}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.mob && !getEditData.mob && (
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
                value={getEditData.address}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.address && !getEditData.address && (
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
                value={getEditData.city}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.city && !getEditData.city && (
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
                value={getEditData.state}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.state && !getEditData.state && (
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
                value={ getEditData.country}
                placeholder='Country'
                class='form-control'
              />
              {errors && errors.country && !getEditData.country && (
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
                value={ getEditData.pin}
                placeholder='email@example.com'
                class='form-control'
              />
              {errors && errors.pin && !getEditData.pin && (
                <span class='text-danger'>{errors.pin}</span>
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
                value={ getEditData.email}
                class='form-control'
                id='inputPassword'
              />
              {errors && errors.email && !getEditData.email && (
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
              {getEditData.myImg === null ? (
                <span class='text-danger'>Please Choose Image</span>
              ) : null}
            </div>
          </div>
          <button type='submit' class=' btn btn-danger'>
            Update
          </button>
        </form>
      </div>
    </>
  );
};
export default EditRecord;
