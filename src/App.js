import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginForm from './component/loginComp/index';
import RegisterForm from './component/registerComp/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<LoginForm />} />
          <Route exact path='/userRegister' element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
