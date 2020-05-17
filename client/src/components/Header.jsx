import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/logo.png';

import SimpleModal from './SimpleModal';


const Header = () => {
    
    return (
        <React.Fragment>
            <AppBar position="fixed" color="default">
                <Toolbar>
                    <img style={{ width: "200px" }} src={logo} alt="Logo" />
                    <SimpleModal />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
};

export default Header;