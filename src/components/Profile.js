import React, {useState, useContext} from 'react';
import {Grid, Typography, FormControl, TextField, Button, Paper, Alert} from '@mui/material';
import JoblyApi from '../helper/JoblyAPI';
import UserContext from '../helper/UserContext';

const Profile = () => {
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

    const [formData, setFormData] = useState({
        password:"",
        firstName:user.firstName,
        lastName: user.lastName,
        email:user.email
        });

    const [error, setError] = useState({
        state: false,
        message: ""
    });

    const [success, setSuccess] = useState({
        state: false,
        message: ""
    });

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
        if (await handleValidation() === true) {
            try{
                await JoblyApi.updateUser(user.username, formData);
                return handleSuccess(`Successfully updated ${user.username}'s information.`)
            } catch (err){
                handleError("update unsuccessful!")
            }
        }
    }

    const handleValidation = async () => {
        try{
            await JoblyApi.createToken({username:user.username, password:formData.password});
            return true;
        } catch (err){
            return handleError("Password is incorrect! Please try again!")
        }
    }

    const handleError = (errMsg) => {
        setError({state:true, message: errMsg});
        setTimeout(() => {
            setError({state:false, message: ""});
        }, 8000);
    }

    const handleSuccess = (msg) => {
        setSuccess({state:true, message: msg});
        setTimeout(() => {
            setSuccess({state:false, message: ""});
        }, 8000);
    }

    //form to create a new user
    return (
        <Grid container style={centering}>
            <Grid item xs={12}>
                {error.state === true && 
                    <Alert severity='error'>{error.message}</Alert>
                }
                {success.state === true &&
                    <Alert severity='success'>{success.message}</Alert>
                }
            </Grid>
            <Paper style={container}>
            <Typography variant="h4">{user.username}'s Profile</Typography>
            <FormControl sx={formStyle}>
                <TextField
                    type={"text"}
                    id='firstName'
                    name='firstName'
                    label='First Name'
                    placeholder={user.firstName}
                    value={formData.firstName}
                    onChange={handleChange} />
            </FormControl>
            <FormControl sx={formStyle}>
                <TextField
                    type={"text"}
                    id='lastName'
                    name='lastName'
                    label='Last Name'
                    placeholder='Last Name'
                    value={formData.lastName}
                    onChange={handleChange} />
            </FormControl>
            <FormControl sx={formStyle}>
                <TextField
                    type={"email"}
                    id='email'
                    name='email'
                    label='Email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange} />
            </FormControl>
            <FormControl sx={formStyle}>
                <TextField
                    type={"password"}
                    id='password'
                    name='password'
                    label='Confirm with Password'
                    placeholder='Confirm with Password'
                    value={formData.password}
                    onChange={handleChange} />
            </FormControl>
                <Button onClick={handleSubmit} variant="contained" color="primary">Save Changes</Button>
            </Paper>
        </Grid>
        )
}

export default Profile;