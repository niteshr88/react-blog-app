import './App.css'
import AddBlog from './component/AddBlog'
import Dashboard from './component/Dashboard'
import Home from './component/Home'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReadBlog from './component/ReadBlog';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import Slideshow from './component/Slideshow';
import Welcome from './component/Welcome';
import useUserSession from './Custom/useUserSession';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { login, logout } from './store/authSlice';

const RoutesConfig = () => {
  return(
  <Routes>
    <Route path="/" element={<Dashboard/>}>
    <Route index element={<Home/>}/>
    <Route path="readblog/:slug" element={<ReadBlog />} />
    <Route path='slider' element={<Slideshow/>}/>
    </Route>
    <Route path="addblog" element={<AddBlog/>}/>
    <Route path="signup" element={<SignupForm/>}/>
    <Route path="login" element={<LoginForm/>}/>
    <Route path='welcome/:slug' element={<Welcome/>}/>
  </Routes>
  )
}
function App() {
const dispatch = useDispatch();
const session = useUserSession();

useEffect(() => {
  if(session){
    dispatch(login({userData: session}))
  }
  else{
    dispatch(logout);
  }
}, [session, dispatch])
  return (
    <Router>
      <RoutesConfig />
    </Router>
  )
}

export default App

