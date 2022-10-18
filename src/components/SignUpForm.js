import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Grid, Typography, FormControl, TextField, Button, Paper, Alert} from '@mui/material';
import UserContext from '../helper/UserContext';

const SignUpForm = ({signup}) => {
    const {user} = useContext(UserContext);
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const formStyle = { m: 1, width: 300, alignItems: "center" };
    const container = {
        display: "flex",
        flexDirection: "column",
        padding: 35,
        justifyContent: "center",
        alignItems: "center",
      };

    const initialState = {
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        email:""
    }

    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState({
        state: false,
        message: ""
    });

    const navigate = useNavigate();
    
    if(user !== null && Object.keys(user).length > 0){
        navigate('/companies');
    }

    //handle form change, submit, and validate if all data are inputted
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation() === true){
            const userSignup = await signup(formData);
            if(!userSignup) handleError("signup failed!");
            setFormData(initialState);
        }
        return ;
    }

    const handleValidation = () => {
        for (let key in formData){
            if (formData[key].length === 0){
                alert(`${key} was not filled!`)
                return false;
            }
        }
        return true;
    }

    const handleError = (errMsg) => {
        setError({state:true, message: errMsg});
        setTimeout(() => {
            setError({state:false, message: ""});
        }, 5000);
    }

    //form to create a new user
    return (
        <Grid container style={centering}>
            <Grid item xs={12}>
                {error.state === true && 
                    <Alert severity='error'>{error.message} -- try again!</Alert>
                }
            </Grid>
            <Paper style={container}>
            <Typography variant="h4">Sign Up</Typography>
            <FormControl sx={formStyle}>
                <TextField
                    type={"text"}
                    id='username'
                    name='username'
                    label="Username"
                    placeholder='username'
                    value={formData.username}
                    onChange={handleChange} />
            </FormControl>
            <FormControl sx={formStyle}>
                <TextField
                    type={"password"}
                    id='password'
                    name='password'
                    label="Password"
                    placeholder='password'
                    value={formData.password}
                    onChange={handleChange} />
            </FormControl>
            <FormControl sx={formStyle}>
                <TextField
                    type={"text"}
                    id='firstName'
                    name='firstName'
                    label="First name"
                    placeholder="first name"
                    value={formData.firstName}
                    onChange={handleChange} />
            </FormControl>
            <FormControl sx={formStyle}>
                <TextField
                    type={"text"}
                    id='lastName'
                    name='lastName'
                    label="Last name"
                    placeholder="last name"
                    value={formData.lastName}
                    onChange={handleChange} />
            </FormControl>
            <FormControl sx={formStyle}>
                <TextField
                    type={"email"}
                    id='email'
                    name='email'
                    label="Email"
                    placeholder='email'
                    value={formData.email}
                    onChange={handleChange} />
            </FormControl>
                <Button onClick={handleSubmit} variant="contained" color="primary">Sign Up</Button>
            </Paper>
        </Grid>
        )
}

export default SignUpForm;