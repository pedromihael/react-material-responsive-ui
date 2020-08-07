import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  typographyTitle: {
    padding: '24px 16px 24px 16px',
    fontWeight: 'bold'
  },
  tableContainer: {
    background: '#424242',
    paddingBottom: '16px',
    margin: 'auto',
    color: 'white'
  },
  tableCell: {
    color: 'white',
    borderColor: '#515151',
   
  },
  headCell: {
    color: 'white',
    borderColor: '#515151',
    fontWeight: 'bold'
   
  }
});

const SimpleTable = props => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      {props.tableTitle ?? (
        <Typography variant="h6" className={classes.typographyTitle}>
          {props.tableTitle}
        </Typography>
      )}
      <Table className={classes.table} aria-label="tabela-de-custos-por-minuto-excedido">
        <TableHead>
          <TableRow>
            {props.head.map(headCell => (
              <TableCell
                className={classes.headCell}
                component="th"
                key={headCell.item}>
                {headCell.item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.body.map((bodyCell) => (
            <TableRow key={bodyCell.id}>
              <TableCell
                className={classes.tableCell}
                component="th"
                scope="row">
                {bodyCell.origin}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">{bodyCell.destination}</TableCell>
              <TableCell className={classes.tableCell} align="left">{bodyCell.duration}</TableCell>
              <TableCell className={classes.tableCell} align="left">{bodyCell.plan}</TableCell>
              <TableCell className={classes.tableCell} align="left">{bodyCell.withPlan}</TableCell>
              <TableCell className={classes.tableCell} align="left">{bodyCell.withoutPlan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleTable;
