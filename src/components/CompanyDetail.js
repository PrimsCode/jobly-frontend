import React, { useState, useEffect} from 'react';
import {Grid, Typography} from '@mui/material';
import JobCard from './JobCard';
import JoblyApi from '../helper/JoblyAPI';
import { useParams } from 'react-router-dom';

const CompanyDetail = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const textContainer = {display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center", margin:"5px"};

    let {handle} = useParams();

    const [company, setCompany] = useState({});
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getCompany(handle);
    }, []);

    const getCompany = async (handle) => {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company);
        setJobs(company.jobs);
    }
    console.log(company);
    
    return (
        <Grid container style={centering}>
            <Grid item xs={12} style={textContainer}>
                <Typography variant="h4">{company.name}</Typography>
                <Typography variant="h6" sx={{fontStyle:'italic', fontWeight:"light"}}>{company.description}</Typography>

            </Grid>

            {jobs.length ?
                <div>
                    {jobs.map((job) => (
                        <JobCard job={job} />
                    ))}
                </div>
            :
            <Typography variant="h5" >No Current Job Opening!</Typography>}

        </Grid>
    )
}

export default CompanyDetail;