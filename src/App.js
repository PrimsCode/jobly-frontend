import React, {useEffect, useState, useMemo} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UserContext from './helper/UserContext';

//backend
import JoblyApi from './helper/JoblyAPI';
import jwt from "webcrypto-jwt";

//components
import NavBar from './components/NavBar';
import Home from './components/Home'
import Profile from './components/Profile';
import CompanyList from './components/CompanyList'
import JobList from './components/JobList';
import CompanyDetail from './components/CompanyDetail';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Loading from './components/Loading';
import useLocalStorage from "./hook/useLocalStorage";
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {

  const [user, setUser] = useState(null);
  const providerUser = useMemo(()=> ({user, setUser}), [user, setUser]);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoading, setInfoLoading] = useState(false);

  useEffect(() => {
    const getCurrentUser = async() => {
      try {
        if (token) {
          JoblyApi.token = token;
          const decode = jwt.parseJWT(token);    
          let currentUser = await JoblyApi.getUser(decode.username);
          setUser(currentUser);
        }
      } catch (err) {
        setUser(null);
      }
      setInfoLoading(true);
    }
    setInfoLoading(false);
    getCurrentUser();
  },[token])

  async function login(loginData) {
    try {
      let token = await JoblyApi.createToken(loginData);
      setToken(token);
      return true;
    } catch (errors) {
      return false;
    }
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.createNewUser(signupData);
      setToken(token);
      return true;
    } catch (errors) {
      return false;
    }
  }

  if (!infoLoading) return <Loading />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={providerUser}>
        <NavBar setToken={setToken} setUser={setUser} />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm signup={signup} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
