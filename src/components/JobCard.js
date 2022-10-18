import React, {useState, useEffect, useContext} from 'react';
import {Card, CardContent, CardActionArea, Typography, Button} from '@mui/material';
import JoblyApi from '../helper/JoblyAPI';
import UserContext from '../helper/UserContext';

const JobCard = ({job}) => {
    const [jobApplied, setJobApplied] = useState([]);
    const {user} = useContext(UserContext);

    const cardStyle = {
        display: 'block',
        width: '60vw',
        height: '15vw',
        margin: '5px'
    }

    const apply = async () => {
        const applied = await JoblyApi.applyToJob(user.username, job.id);
        setJobApplied(current => [...current, job.id]);
        return applied;
    }

    const checkApply = async (user) => {
        const checkUser = await JoblyApi.getUser(user.username);
        setJobApplied(checkUser.applications);
    }

    useEffect(() => {
        checkApply(user);
    }, []);

    return (
        <Card style={cardStyle} id={job.id}>
            <CardContent>
                <Typography variant='h5'>{job.title}</Typography>
                <Typography variant="h6">{job.companyName}</Typography>
                <Typography variant="body1">Salary: {job.salary}</Typography>
                <Typography variant="body1">Equity: {job.equity}</Typography>
            </CardContent>
            <CardActionArea style={{display:"flex", justifyContent:"flex-end", paddingRight:"10px"}} >
                {jobApplied.includes(job.id) ?
                    <Button disabled variant="contained" color="error" id={job.id} >Applied</Button>
                    :
                    <Button variant="contained" color="error" id={job.id} onClick={apply}>Apply</Button>
                }
            </CardActionArea>
        </Card>

    )
}

export default JobCard;