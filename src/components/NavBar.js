import React, {useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {Button, AppBar, Toolbar, Typography, Container} from '@mui/material';
import UserContext from '../helper/UserContext';

const NavBar = ({setToken, setUser}) => {
    const {user} = useContext(UserContext);
  
    const navigate = useNavigate();

    //handle logging out
    const handleLogout = () => {
        setToken("");
        setUser(null);
        localStorage.clear();
        navigate("/");
    }

    return (
        <AppBar position="static" style={{backgroundColor:"white"}}>
            <Toolbar>
                <Link to="/" style={{textDecoration: "none"}}>
                <Typography variant='h5' color='primary'>Jobly</Typography>
                </Link>
            {user !== null && Object.keys(user).length > 0 ? 
                <Container>
                    <Button href="/companies">Companies</Button>
                    <Button href="/jobs">Jobs</Button>
                    <Button href="/profile">Profile</Button>
                    <Button onClick={handleLogout}>Log out {user["username"]}</Button>
                </Container>
                :
                <Container> 
                    <Button href="/login">Login</Button>
                    <Button href="/signup">Sign Up</Button>
                </Container>
            }
            </Toolbar>
        </AppBar>

    );
}

  export default NavBar;