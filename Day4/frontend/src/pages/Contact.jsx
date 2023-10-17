import { Grid, Typography, Button } from "@mui/material";

import { makeStyles } from '@mui/styles';
import blood from '../images/undraw_medicine_b-1-ol (1).svg';
import { Bloodtype } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';

const useStyles = makeStyles({
  root: {
    background: 'radial-gradient(circle, rgb(84 0 0 / 89%) 0%, rgb(0 0 0 / 98%) 90%)',
    color: '#fff',
    display: 'flex',
    padding: '2rem',
    position: 'relative',
    height: '93.2vh',
    fontFamily: 'Montserrat, sans-serif',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 2rem',
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    '& h1': {
      fontSize: '7rem',
      fontWeight: 'bold',
      marginRight: '1rem',
      fontFamily: 'EB Garamond, serif',
    },
    '& svg': {
      fontSize: '3rem',
      color: '#fff',
    }
  },
  facts: {
    marginBottom: '2rem',
  },
  factItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    '& svg': {
      fontSize: '2rem',
      marginRight: '1rem',
      color: 'red',
    },
    '& p': {
      margin: 0,
      fontSize: '1.7rem',
      fontWeight: '400',
      lineHeight: '1.5',
    }
  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#ff4c4c',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    }
  },
  rightSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    '& img': {
      maxWidth: '100%',
    }
  },
});

const Main = () => {
  const classes = useStyles();
  const { access_token } = getToken();

  return (
    <>
    <div className={classes.root}>
      <div className={classes.leftSection}>
        <div className={classes.header}>
          <Typography variant='h1'> Blood Donation</Typography>
          <Bloodtype style={{fontSize: 85}}/>
        </div>
        <div className={classes.facts}>
          <div className={classes.factItem}>
            <Bloodtype />
            <Typography variant='body1'>Donating blood can save up to three lives.</Typography>
          </div>
          <div className={classes.factItem}>
            <Bloodtype />
            <Typography variant='body1'>One blood donation can help as many as four people.</Typography>
          </div>
          <div className={classes.factItem}>
            <Bloodtype />
            <Typography variant='body1'>Every two seconds, someone in the U.S. needs blood.</Typography>
          </div>
        </div>
        {access_token ? <Button variant="contained"  component={NavLink} to='/Home'>Donate now</Button> : <Button variant="contained"  component={NavLink} to='/login' >Donate now</Button>}
      </div>
      <div className={classes.rightSection}>
        <img src={blood} alt='Blood Donation' />
      </div>
    </div>
    
   
    
    </>
  );
};

export default Main;
