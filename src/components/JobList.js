import React, { useState, useEffect} from 'react';
import {Grid, Typography} from '@mui/material';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import JoblyApi from '../helper/JoblyAPI';
import Loading from './Loading';

const JobList = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};
    const [jobs, setJobs] = useState([]);
    const [infoLoading, setInfoLoading] = useState(false);

    useEffect(() => {
        setInfoLoading(false);
        searchJobs();
    }, []);

    const searchJobs = async (searchQuery) => {
        let jobs = await JoblyApi.getJobs(searchQuery);
        setJobs(jobs);
        setInfoLoading(true);
    }

    if (!infoLoading) return <Loading />;
    
    return (
        <Grid container style={centering}>
            <SearchBar type="jobs" search={searchJobs} />
            {jobs.length ?
                <div>
                    {jobs.map((job) => (
                        <JobCard job={job} />
                    ))}
                </div>
            :
            <Typography variant="h5" >No Job Found!</Typography>}

        </Grid>
    )
}

export default JobList;