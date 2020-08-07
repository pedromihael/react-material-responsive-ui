import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Button, Grid } from '@material-ui/core';
import CostsModal from './CostsModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '0%',
    },
    toolbar: {
        padding: '16px 24px 16px 24px ',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            margin: '0',
            padding: '48px 8px 48px 48px',
        }
    },
    title: {
        flexGrow: 1,
        display: 'none',
        color: 'white',
        letterSpacing: '8px',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        }
    },
    buttonsGrid: {
        textAlign: 'center',
        [theme.breakpoints.only('sm')]: {
            paddingRight: '16px'
        },
    },
    actionCostsSimulation: {
        color: '#121212',
        fontWeight: 'bold',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
        marginLeft: '8px'
    },
    contactAndAboutButtons: {
        color: 'white',
        marginLeft: '8px',
        marginRight: '8px'
    },
}));

function Header(props) {
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar className={classes.toolbar} >

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={8}>
                                <Typography className={classes.title} variant="h3" noWrap>
                                    {props.text}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.buttonsGrid}>
                                <Button className={classes.contactAndAboutButtons}>Contato</Button>
                                <Button className={classes.contactAndAboutButtons}>Sobre nós</Button>
                                <Button variant="contained" onClick={handleModalOpen} className={classes.actionCostsSimulation}>Simule custos</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
            <div className="modal">
                <CostsModal modalOpen={modalOpen} modalClose={handleModalClose} />
            </div>
        </>
    );
}

export default Header;