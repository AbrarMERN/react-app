import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const ListUser = () => {
  const mystyle = {
    color: 'Black',
    padding: '10px',
    fontFamily: 'Arial',
  };
  const navigate = useNavigate();
  const [activepage, setActivePage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState('');
  // const [searchData, setSearchData] = useState('');
  const handlePageClick = ({ selected }) => {
    setSkip(selected * limit);
    setActivePage(selected);
  };

  console.log('count', count);
  const pageCount = Math.ceil(count / limit);
  console.log('page count', pageCount);
  const getData = async (limit, skip) => {
    console.log('limit', limit);
    console.log('skip', skip);
    console.log('i am trigger');
    // const token=headers.Authorization.Bearer() token"}
    const token = localStorage.getItem('login-token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(
      `http://localhost:9000/api/user/listUserRoute?limit=${limit}&skip=${skip}`,
      config
    );
    const { count, data } = response.data;
    setUserData(data);
    setCount(count);
  };

  useEffect(() => {
    if (localStorage.getItem('login-token')) {
      navigate('/userList');
    } else {
      navigate('/');
    }
    getData(limit, skip);
  }, [limit, skip]);
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };
  const deleteUser = async (id) => {
    const token = localStorage.getItem('login-token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const delUser = await axios.delete(
      `http://localhost:9000/api/user/deleteUserRoute/${id}`,
      config
    );
    console.log(delUser);
  };
  const onchangeHandle = async (e) => {
    // const { name, value } = e.target;
    // setSearchData({ ...searchData, [name]: value });
    const token = localStorage.getItem('login-token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const users = await axios.get(
      `http://localhost:9000/api/user/searchUserRoute/${e.target.value}`,
      config
    );
    if (users.data.code === 200) {
      const { count, data } = users.data;
      setUserData(data);
      setCount(count);
    }
  };
  return (
    <>
      <div class='container'>
        <div class='col-md-12'>
          <nav class='navbar navbar-expand-sm bg-light'>
            <div class='container-fluid'>
              <ul class='navbar-nav'>
                <li class='nav-item' style={mystyle}>
                  <Link to='/addRecord'>Add Record</Link>
                </li>
                <li class='nav-item' style={mystyle}>
                  <Link to='searchRecord'>Search Record</Link>
                </li>
                <li class='nav-item' style={mystyle}>
                  <Link to='resetPassword'>Reset Password</Link>
                </li>
                <li class='nav-item' style={mystyle}>
                  <a href='#' onClick={logout}>
                    LOGOUT
                  </a>
                </li>
              </ul>
            </div>
            <div class='mb-3 row'>
              <label class='col-sm-2 col-form-label'>Search User</label>
              <div class='col-sm-10'>
                <input
                  type='text'
                  name='search'
                  onChange={(e) => onchangeHandle(e)}
                  class='form-control'
                  id='inputPassword'
                />
              </div>
            </div>
          </nav>
          <table class='table'>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Pin</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((el) => (
                  <tr>
                    {console.log('el', el)}
                    <td>{el.fname}</td>
                    <td>{el.lname}</td>
                    <td>{el.mob}</td>
                    <td>{el.address}</td>
                    <td>{el.city}</td>
                    <td>{el.state}</td>
                    <td>{el.country}</td>
                    <td>{el.pin}</td>
                    <td>{el.email}</td>
                    <td>
                      <button onClick={() => deleteUser(el._id)}>
                        Delete User
                        {/* <Link to={`/editRecord/${el._id}`}>Delete Record</Link> */}
                      </button>
                    </td>
                    <td>
                      <button>
                        <Link to={`/editRecord/${el.userid}`}>
                          Edite Record
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel='Previous'
            nextLabel='Next'
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    </>
  );
};
export default ListUser;
