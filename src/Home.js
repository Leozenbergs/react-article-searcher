import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './main.css';
import Container from '@material-ui/core/Container';

import Form from './_form';


export default function Home(){
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">                
                <h2 className="text-center">Search articles</h2>
                <hr className="titleLine" />
                <Form />
            </Container>
        </React.Fragment>
    );
}