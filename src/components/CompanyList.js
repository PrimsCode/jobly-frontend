import React, { useState, useEffect} from 'react';
import {Grid, Typography} from '@mui/material';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import JoblyApi from '../helper/JoblyAPI';
import Loading from './Loading';

const CompanyList = () => {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center", margin:"20px"};

    const [companies, setCompanies] = useState([]);
    const [infoLoading, setInfoLoading] = useState(false);

    useEffect(() => {
        setInfoLoading(false);
        searchCompanies();
    }, []);

    const searchCompanies = async (searchQuery) => {
        let companies = await JoblyApi.getCompanies(searchQuery);
        setCompanies(companies);
        setInfoLoading(true);
    }

    if (!infoLoading) return <Loading />;
    
    return (
        <Grid container style={centering}>
            <SearchBar type="company" search={searchCompanies} />
            {companies.length ?
                <div>
                    {companies.map((company) => (
                        <CompanyCard company={company} />
                    ))}
                </div>
            :
            <Typography variant="h5" >No Company Found!</Typography>}

        </Grid>
    )
}

export default CompanyList;