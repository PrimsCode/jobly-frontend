import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardContent, Typography} from '@mui/material';

const CompanyCard = ({company}) => {
    const cardStyle = {
        display: 'block',
        width: '60vw',
        height: '15vw',
        margin: '5px'
    }

    console.log(company.logoUrl);

    return (
        <Link to={`/companies/${company.handle}`} style={{textDecoration: "none"}}>
        <Card style={cardStyle} key={company.handle}>
            <CardContent>
                <Typography variant='h6'>{company.name}</Typography>
                <Typography variant="body1">{company.description}</Typography>
            </CardContent>
            {/* <CardContent>
                {company.logoUrl !== null ? <img src={company.logoUrl} alt={company.handle} width="150"></img> : null}
            </CardContent> */}
        </Card>
        </Link>
    );
}

export default CompanyCard;