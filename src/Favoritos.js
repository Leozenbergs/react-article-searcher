import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './main.css';
import Container from '@material-ui/core/Container';


export default function Favoritos(){
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <h2 className="text-center">Favoritos</h2>
            </Container>
        </React.Fragment>
    );
}