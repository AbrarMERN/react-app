import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginForm from './component/loginComp/index';
import RegisterForm from './component/registerComp/index';
import ListUser from './component/userComp/ListUser';
import AddRecord from './component/userComp/AddRecord';
import EditRecord from './component/userComp/EditRecord';
import ForgetPass from './component/ForgetComp/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<LoginForm />} />
          <Route path='/userRegister' element={<RegisterForm />} />
          <Route path='/userList' element={<ListUser />} />
          <Route path='/addRecord' element={<AddRecord />} />
          <Route path='/forgetPass' element={<ForgetPass />} />
          <Route path='/editRecord/:data' element={<EditRecord />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
