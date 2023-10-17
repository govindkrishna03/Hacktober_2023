import React, { useState } from 'react';
import axios from 'axios';
import Card from './card.jsx';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import './recieve.css';
import blood from '../images/Project_69-01.jpg';

function Receive() {
  const [blood_group, setblood_group] = useState('');
  const [locality, setLocality] = useState('');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/user/donors/?blood_group=${blood_group}&locality=${locality}`);
      setDonors(response.data);
    } catch (error) {
      console.error(error);
      // Handle error case
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    
    const csvData = "Name,Blood Group,Locality,Contact\n" + donors.map(donor => `${donor.name},${donor.blood_group},${donor.locality},${donor.contact}`).join("\n");

    
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'donors.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          // backgroundColor: 'blanchedalmond',
          // height: '100vh',
        }}
      >
        
        <div
          className="table"
          style={{
            width: '50%',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'rgba(148, 148, 148, 0.44)',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              width: '44%',
              top: '50px',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignContent: 'center',
              marginLeft: '2rem',
              marginRight: '10rem',
              marginTop: '2rem',
            }}
          >
            <FormControl>
              <FormLabel id="bloodGroup-label">Blood Group:</FormLabel>
              <RadioGroup
                aria-labelledby="bloodGroup-label"
                name="bloodGroup"
                value={blood_group}
                onChange={(event) => setblood_group(event.target.value)}
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel value="A" control={<Radio size="large" />} label="A+" />
                <FormControlLabel value="B" control={<Radio size="large" />} label="B+" />
                <FormControlLabel value="AB" control={<Radio size="large" />} label="AB+" />
                <FormControlLabel value="O" control={<Radio size="large" />} label="O+" />
                <FormControlLabel value="a" control={<Radio size="large" />} label="A-" />
                <FormControlLabel value="b" control={<Radio size="large" />} label="B-" />
                <FormControlLabel value="ab" control={<Radio size="large" />} label="AB-" />
                <FormControlLabel value="o" control={<Radio size="large" />} label="O-" />
              </RadioGroup>
            </FormControl>
            <div style={{ margin: '20px 0' }}>
              Locality:
              <input type="text" value={locality} onChange={(event) => setLocality(event.target.value)} />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#4b6cb7',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </form>
          <div className="cards">
            {donors.map((donor) => (
              <Card
                key={donor.id}
                title={donor.name}
                bloodGroup={donor.blood_group}
                locality={donor.locality}
                contact={donor.contact}
              />
            ))}
          </div>
          {donors.length > 0 && (
            <button
              onClick={handleDownload}
              style={{
                backgroundColor: '#4b6cb7',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                marginTop: '16px',
              }}
            >
              Download
            </button>
          )}
        </div>
        {donors.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="pic">
              <h2>Search for the blood group required</h2>
            </div>
            <div>
              <img
                style={{
                  width: '100vh',
                  display: 'flex',
                  flexWrap: 'wrap',
                  position: 'relative',
                  right: '5rem',
                  top: '5rem',
                  justifyContent: 'center',
                  borderRadius: '150px',
                }}
                src={blood}
                alt="Blood Donation"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Receive;
