import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginForm from './component/loginComp/index';
import RegisterForm from './component/registerComp/index';
import ListUser from './component/userComp/ListUser';
import AddRecord from './component/userComp/AddRecord';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
