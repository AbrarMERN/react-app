import React from 'react';
import axios from 'axios';
import csc, {
  Country,
  State,
  City
} from 'country-state-city';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecordValidation } from '../../utils/Validation';

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
const AddRecord = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('login-token')) {
      navigate('/');
    }
  }, []);
  const [Countries, setCountries] = useState([])
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [addData, setaddData] = useState(initialState);
  const [resultMsg, setResultMsg] = useState('');
  const [preview, setPreview] = useState();
  const [country, setCountry] = useState('');
  const [stateData, setStateData] = useState('');
  const [errors, setErrors] = useState({});
  const [countryCode, setCountryCode] = useState('');

  const getAllCountry = () => {
    const allCountry = Country.getAllCountries()
    setCountries(allCountry)
    console.log("All Country In set In satae", allCountry);

  }
  useEffect(() => {
    getAllCountry();

  }, [])

  const onchangeHandle = (e) => {
    const { name, value } = e.target;
    setaddData({ ...addData, [name]: value });
  };
  const handleImageUpload = (e) => {
    if (e.target.files[0].type.search('imgae/')) {
      setaddData({
        ...addData,
        myImg: e.target.files[0],
      });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      alert('Please Choose Image File ');
    }
    console.log('Image In Data', addData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('login-token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
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
      // formData.append(
      //   {fname:addData.fname},
      //   {lname:addData.lname},
      //   {mob:addData.mob},
      //   {address:addData.address},
      //   {city:addData.city},
      //   {state:addData.state},
      //   {country:addData.country},
      //   {pin:addData.pin},
      //   {email:addData.email},
      //   {myImg:addData.myImg},
      // )

      const result = await axios.post(
        'http://localhost:9000/api/user/addUSerRoute',
        formData,
        config
      );
      console.log('adasfjjh', result);
      // toastr.success('Message was sent successfully!');
      if (result.data.status === 200) {
        navigate('/userList');
        toast.success(result.data.msg);
      }
      if (result.data.code === 401) {
        toast.error(result.data.msg);
      }
      if (result.data.code === 301) {
        toast.error(result.data.msg);
      }
      if (result.data.code === 302) {
        toast.error(result.data.msg);
      }
    }
  };
  // const changeCountry = (event) => {
  //   setCountry(Country.getAllCountries());
  //   console.log('Country', country);
  // };\
  
  const getState = (value) => {
    console.log('Country Code', value);
    setCountryCode(value);
    const allStates = State.getStatesOfCountry(value);
    const countryName = Country.getCountryByCode(value);
    console.log('countryName', countryName)
    setStates(allStates)
    setaddData({ ...addData, country: countryName.name});
  };
  const getStateCity = (value) => {
    console.log("dfsdfsd =>", value)
    const cityList = City.getCitiesOfState(countryCode, value);
    const stateName=State.getStateByCode(value);
    console.log("sdasda =>", stateName)
    setCities(cityList);
    setaddData({ ...addData, state: stateName?.name });
  };
  const getCityName=(value)=>{
    // const cityName=City.getStateByCode(value);
    setaddData({ ...addData, city:value });
  }
  // useEffect(
  //   (country) => {
  //     //Reset country and city
  //     //fetch all state data of that country
  //     //store in state state
  //     getState(country);
  //   },
  //   [country]
  // );

  // useEffect((state) => {
  //   //fetch all city data of that state
  //   //store in city state
  // getStateCity(state)
  // }, [state]);
  return (
    <>
      <h1>{countryCode}</h1>
      <div className='container col-md-4'>
        <h1 className='text-warning'>Add Record</h1>
        {console.log('All to country', addData.country)}
        {console.log('All to State', addData.state)}
        {console.log('All to city', addData.city)}
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
              { }
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
                placeholder='Mobile'
                className='form-control'
              />
              {errors && errors.mob && !addData.mob && (
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
                placeholder='Address'
                className='form-control'
              />
              {errors && errors.address && !addData.address && (
                <span className='text-danger'>{errors.address}</span>
              )}
            </div>
          </div>
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Country</label>
            <div className='col-sm-10'>
              <select
                placeholder='Country'
                className='form-control'
                onChange={(e) => getState(e.target.value)}
              >
                {Country.getAllCountries().map((el) => (
                  <option value={el.isoCode}>{el.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>State</label>
            <div className='col-sm-10'>
              <select
                placeholder='Country'
                className='form-control'
                onChange={(e) => getStateCity(e.target.value)}
              // value={el.isoCode}
              >
                <option>Select The State</option>
                {states.map((el) => (
                    <option value={el.isoCode}>{el.name}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>City</label>
            <div className='col-sm-10'>
              <select
                placeholder='Country'
                className='form-control'
                onChange={(e) => getCityName(e.target.value)}
              >
                <option>Select The City</option>
                {cities.map((el) => (
                    <option value={el.isoCode}>{el.name}</option>
                  ))}
              </select>
            </div>
          </div>

          {/* <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>City</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='city'
                onChange={onchangeHandle}
                value={addData.city}
                placeholder='City'
                className='form-control'
              />
              {errors && errors.city && !addData.city && (
                <span className='text-danger'>{errors.city}</span>
              )}
            </div>
          </div> */}
          <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Pin</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='pin'
                onChange={onchangeHandle}
                value={addData.pin}
                placeholder='Pin'
                className='form-control'
              />
              {errors && errors.pin && !addData.pin && (
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
                placeholder='Email'
                class='form-control'
              />
              {errors && errors.email && !addData.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div>
            {/* <div class='col-sm-10'>
              <input
                type='file'
                name='myImg'
                onChange={handleImageUpload}
                class='form-control'
                id='inputPassword'
              />
              {preview ? <img src={preview} alt='sdfsd' /> : ''}
              {errors && errors.email && (
                <span class='text-danger'>{errors.email}</span>
              )}
            </div> */}
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
              {/* {addData.myImg === null ? (
                <span class='text-danger'>Please Choose Image</span>
              ) : null} */}
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
