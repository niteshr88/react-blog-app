import './App.css'
import AddBlog from './component/AddBlog'
import Dashboard from './component/Dashboard'
import Home from './component/Home'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReadBlog from './component/ReadBlog';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';

const RoutesConfig = () => {
  return(
  <Routes>
    <Route path="/" element={<Dashboard/>}>
    <Route index element={<Home/>}/>
    <Route path="readblog/:slug" element={<ReadBlog />} />
    </Route>
    <Route path="addblog" element={<AddBlog/>}/>
    <Route path="signup" element={<SignupForm/>}/>
    <Route path="login" element={<LoginForm/>}/>
  </Routes>
  )
}
function App() {

  return (
    <Router>
      <RoutesConfig />
    </Router>
  )
}

export default App

