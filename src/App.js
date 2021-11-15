import {useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './component/loginComp/index';
import RegisterForm from './component/registerComp/index';
import ListUser from './component/userComp/ListUser';
import AddRecord from './component/userComp/AddRecord';
import EditRecord from './component/userComp/EditRecord';
import ForgetPass from './component/ForgetComp/index';
import ResetPass from './component/ResetComp/ResetPass';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  //const navigate = useNavigate();
  //  useEffect(() =>{
     
  //   const checkLogin = async()=>{
  //     const token = localStorage.getItem('login-token');
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //    if(token){
  //      let result = await axios.post('http://127.0.0.1:9000/api/user/validateTokenRoute',config);
  //      if(result.data.code === 401){
  //        localStorage.removeItem('login-token')
  //        navigate('/')
  //      }
  //    }
  //   }
  //   checkLogin()
  //  },[])
  return (
   
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<LoginForm />} />
          <Route path='/userRegister' element={<RegisterForm />} />
          <Route path='/userList' element={<ListUser />} />
          <Route path='/addRecord' element={<AddRecord />} />
          <Route path='/forgetPass' element={<ForgetPass />} />
          <Route path='/resetPass/:key' element={<ResetPass />} />
          <Route path='/editRecord/:data' element={<EditRecord />} />
        </Routes>
      </div>
  );
}

export default App;
