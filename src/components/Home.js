import React from 'react';
import {Grid, Button, Typography} from '@mui/material';
import { useContext } from 'react';
import UserContext from '../helper/UserContext';

const Home = () => {
    const {user} = useContext(UserContext);
    console.log(user);
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};

    return (
        <Grid container style={centering}>
            <Grid item xs={12} style={centering} margin="30px">
                <Typography variant='h1'>Jobly</Typography>
            </Grid>
            <Grid item xs={12} style={centering}>
                <Typography variant='h6'>All the jobs in one, convenient place.</Typography>
            </Grid>
            {user === null || user.length === 0 ?
                <Grid item xs={12} style={centering}>
                    <Button href="/login" variant='contained' style={{margin:"5px"}}>Log in</Button>
                    <Button href="/signup" variant='contained' style={{margin:"5px"}}>Sign up</Button>
                </Grid>
            :
                <Grid item xs={12} style={centering}>
                    <Typography variant='h3'>Welcome Back, {user.username}!</Typography>
                </Grid>         
        }
        </Grid>
    )
}

export default Home;