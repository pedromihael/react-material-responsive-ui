import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import api from '../utils/apiConnection';

const useStyles = makeStyles((theme) => ({
    Paper: {
        padding: 36,
        background: '#333',
        margin: 'auto',
        marginBottom: 24,
        [theme.breakpoints.only('xs')]: {
            padding: '8% 4% 100% 4%',
        },
        [theme.breakpoints.only('md')]: {
            padding: '8% 4% 50% 4%'
        }
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    modalPaper: {
        background: '#333',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.only('xs')]: {
            margin: '10%'
        },
        [theme.breakpoints.up('xs')]: {
            margin: '50%'
        }
    },
    formControl: {
        color: '#dadada',
        borderColor: 'white',
        minWidth: 300,
        marginBottom: "16px"
    },
    buttonModalSimulate: {
        color: 'white',
        marginTop: '24px',
        fontWeight: 'bold'
    },
    buttonModalClose: {
        color: 'white',
        marginTop: '24px'
    },
    typoModal: {
        marginBottom: '16px'
    },
    modalSimulatedCost: {
        marginTop: '16px'
    }
}));

const CostsModal = props => {

    const classes = useStyles();

    const [planInput, setPlanInput] = useState('');

    const handleSelectChange = (event) => {
        setPlanInput(event.target.value);
    };

    const [openSelect, setOpenSelect] = useState(false);

    const handleOpenSelect = () => {
        setOpenSelect(true);
    };

    const handleCloseSelect = () => {
        setOpenSelect(false);
    };

    const [originInput, setOriginInput] = useState('');

    const handleOriginInputChange = (event) => {
        setOriginInput(event.target.value);
    };

    const [destinationInput, setDestinationInput] = useState('');

    const handleDestinationInputChange = (event) => {
        setDestinationInput(event.target.value);
    };

    const [durationInput, setDurationInput] = useState('');

    const handleDurationInputChange = (event) => {
        setDurationInput(event.target.value);
    };

    const [simulatedCostWithPlan, setSimulatedCostWithPlan] = useState('');

    const [simulatedCostWithoutPlan, setSimulatedCostWithoutPlan] = useState('');

    const handleSimulation = async (event) => {
        event.preventDefault();

        const taxesApiResult = await api.get(`/custos/${originInput}-${destinationInput}`);
        const tax = taxesApiResult.data.response.tax ?? 0; // setar com useEffect
        const { withPlan, withoutPlan } = defineTotalTax(originInput, destinationInput, tax, planInput, durationInput);

        setSimulatedCostWithPlan(withPlan);
        setSimulatedCostWithoutPlan(withoutPlan);
    };

    useEffect(() => { }, [simulatedCostWithPlan, simulatedCostWithoutPlan]);


    const defineTotalTax = (origin, destination, tax, plan, duration) => {

        if (tax === 0) {
            return {
                withPlan: "-",
                withoutPlan: "-"
            };
        }

        switch (plan) {
            case "FaleMais 30":
                if (duration > 30) {
                    return {
                        withPlan: (duration - 30) * tax + ((duration - 30) * tax / 10),
                        withoutPlan: duration * tax
                    };
                } else return 0;

            case "FaleMais 60":
                if (duration > 60) {
                    return {
                        withPlan: (duration - 60) * tax + ((duration - 60) * tax / 10),
                        withoutPlan: duration * tax
                    };
                } else return 0;

            case "FaleMais 120":
                if (duration > 120) {
                    return {
                        withPlan: (duration - 120) * tax + ((duration - 120) * tax / 10),
                        withoutPlan: duration * tax
                    };
                } else return 0;

            default:
                return {
                    withPlan: "-",
                    withoutPlan: duration * tax + (duration * tax) / 10
                };
        }

    }

    return (
        <div className="Modal">

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.modalOpen}
                onClose={props.modalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.modalOpen}>
                    <div className={classes.modalPaper}>
                        <Typography variant="h6" className={classes.typoModal}>
                            Simule Custos
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <FormControl>
                                    <InputLabel
                                        className={classes.formControl}
                                        htmlFor="origin-input">
                                        DDD de origem
                                    </InputLabel>
                                    <Input
                                        className={classes.formControl}
                                        id="origin-input"
                                        onChange={handleOriginInputChange}
                                        value={originInput}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl >
                                    <InputLabel
                                        className={classes.formControl}
                                        htmlFor="origin-destination">
                                        DDD de destino
                                    </InputLabel>
                                    <Input
                                        className={classes.formControl}
                                        id="origin-destination"
                                        onChange={handleDestinationInputChange}
                                        value={destinationInput} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl >
                                    <InputLabel
                                        className={classes.formControl}
                                        htmlFor="duration-input">
                                        Duração
                                    </InputLabel>
                                    <Input
                                        className={classes.formControl}
                                        id="duration-input"
                                        onChange={handleDurationInputChange}
                                        value={durationInput} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl xs={12} md={12}>
                                    <InputLabel id="select" className={classes.formControl}>Plano FaleMais</InputLabel>
                                    <Select
                                        className={classes.formControl}
                                        labelId="select"
                                        id="controlled-open-select"
                                        open={openSelect}
                                        onClose={handleCloseSelect}
                                        onOpen={handleOpenSelect}
                                        value={planInput}
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="">
                                            <em>Sem plano</em>
                                        </MenuItem>
                                        <MenuItem value="FaleMais 30">FaleMais 30</MenuItem>
                                        <MenuItem value="FaleMais 60">FaleMais 60</MenuItem>
                                        <MenuItem value="FaleMais 120">FaleMais 120</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.modalSimulatedCost}>
                                    Com o plano: R$ {simulatedCostWithPlan}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.modalSimulatedCost}>
                                    Sem o plano: R$ {simulatedCostWithoutPlan}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ textAlign: 'right' }}>
                                <Button className={classes.buttonModalSimulate} type="submit" onClick={handleSimulation}>Simular</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>

        </div>
    );
}

export default CostsModal;
