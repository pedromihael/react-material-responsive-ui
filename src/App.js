import React, { useState } from 'react';
import { Header, Table, CostsModal } from './Components';
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import './styles/App.css';

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
  Typo: {
    color: 'white',
    padding: '24px 0px 24px 0%',
    textAlign: 'center',
    fontSize: '24px',
    [theme.breakpoints.only('xs')]: {
      fontSize: '16px'
    }
  },
  fab: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}));

const App = () => {

  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const taxes = [
    {
      id: "011_016_20_FaleMais_30", origin: "011", destination: "016",
      duration: 20, plan: "FaleMais 30", withPlan: "R$ 0,00", withoutPlan: "R$ 38,00"
    },
    {
      id: "011_017_80_FaleMais_60", origin: "011", destination: "017",
      duration: 80, plan: "FaleMais 60", withPlan: "R$ 37,40", withoutPlan: "R$ 136,00"
    },
    {
      id: "018_011_200_FaleMais_120", origin: "018", destination: "011",
      duration: 200, plan: "FaleMais 120", withPlan: "R$ 167,20", withoutPlan: "R$ 380,00"
    },
    {
      id: "018_017_100_FaleMais_30", origin: "018", destination: "017",
      duration: 100, plan: "FaleMais 30", withPlan: "R$ -", withoutPlan: "R$ -"
    },
  ];

  const headFields = [
    { item: "Origem" }, { item: "Destino" }, { item: "Duração" }, { item: "Plano" }, { item: "Com FaleMais" }, { item: "Sem FaleMais" }
  ];


  return (
    <div className="App">
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} sm={12}>
          <Header text="TELZIR" />
        </Grid>
        <Grid item xs={12} md={10} sm={12}>
          <Paper className={classes.Paper}>
            <Typography className={classes.Typo}>
              FaleMais, pagando pouco!
              </Typography>
            <Table head={headFields} body={taxes} />
          </Paper>
        </Grid>
      </Grid>
      <Fab aria-label="simulacao_pesquisa" className={classes.fab} onClick={handleModalOpen}>
        <SearchIcon />
      </Fab>
      <CostsModal modalOpen={modalOpen} modalClose={handleModalClose}/>
    </div>
  );
}

export default App;
