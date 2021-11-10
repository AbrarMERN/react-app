import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const ListUser = () => {
  const navigate = useNavigate();
  const [activepage, setActivePage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState('');
  const handlePageClick = ({ selected }) => {
    setSkip(selected * limit);
    setActivePage(selected);
  };
  const mystyle = {
    color: 'Black',
    padding: '10px',
    fontFamily: 'Arial',
  };
  console.log('count', count);
  const pageCount = Math.ceil(count / limit);
  console.log('page count', pageCount);
  const getData = async (limit, skip) => {
    console.log('limit', limit);
    console.log('skip', skip);
    console.log('i am trigger');
    const response = await axios.get(
      `http://localhost:9000/userList/listUserRoute?limit=${limit}&skip=${skip}`
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
                  <Link to='/editRecord'>Edit Record</Link>
                </li>
                <li class='nav-item' style={mystyle}>
                  <Link to='/deleteRecord'>Delete Record</Link>
                </li>
                <li class='nav-item' style={mystyle}>
                  <Link to='searchRecord'>Search Record</Link>
                </li>
                <li class='nav-item' style={mystyle}>
                  <Link to='forgetPassword'>Forget Password</Link>
                </li>
              </ul>
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
                    <td>{el.fname}</td>
                    <td>{el.lname}</td>
                    <td>{el.mob}</td>
                    <td>{el.address}</td>
                    <td>{el.city}</td>
                    <td>{el.state}</td>
                    <td>{el.country}</td>
                    <td>{el.pin}</td>
                    <td>{el.email}</td>
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
