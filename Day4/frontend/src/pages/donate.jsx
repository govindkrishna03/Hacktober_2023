import React, { useState } from 'react';
import axios from 'axios';
import './donate.css';
import visitors from '../images/doctor-visiting-a-patient-during-corona.svg';
import don from '../images/healthy-man-donating-his-blood.svg';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    blood_group: '',
    locality: '',
    contact: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/api/user/donors/';
    try {
      const response = await axios.post(url, formData);
      console.log('Form data submitted:', response.data);
  
      // join.amfoss.in
      alert('Form data submitted successfully!');
      navigate('/redirect-page'); 
    } catch (error) {
      console.error('Error submitting form data:', error);
  
      // Display error alert
      alert('Error submitting form data. Please try again.');
    }
  };
  

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Box
      container
      spacing={2}
      sx={{ bgcolor: 'radial-gradient(circle, rgba(158,0,0,0.8883928571428571) 0%, rgba(0,0,0,0.9780287114845938) 90%)' }}
    >
      <Box item xs={12} md={6}></Box>
      <Box item xs={12} md={6}>
        <Box className='hello'>
          <img className='visit' src={visitors} alt="placeholder" />
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 4,
              py: 2,
              bgcolor: 'white',
            }}
            id="registration-form"
            onSubmit={handleSubmit}
          >
            <Typography variant="h3" sx={{ mb: 3 }}>
              Donate Form
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Please fill your details
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              name="age"
              label="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="locality"
              name="locality"
              label="Locality"
              value={formData.locality}
              onChange={handleChange}
            />
            <FormControl component="fieldset" margin="normal" required fullWidth>
              <FormLabel component="legend">Blood Group</FormLabel>
              <RadioGroup
                row
                aria-label="blood-group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
              >
                <FormControlLabel value="A" control={<Radio />} label="A+" />
                <FormControlLabel value="a" control={<Radio />} label="A-" />
                <FormControlLabel value="B" control={<Radio />} label="B+" />
                <FormControlLabel value="b" control={<Radio />} label="B-" />
                <FormControlLabel value="AB" control={<Radio />} label="AB+" />
                <FormControlLabel value="ab" control={<Radio />} label="AB-" />
                <FormControlLabel value="O" control={<Radio />} label="O+" />
                <FormControlLabel value="o" control={<Radio />} label="O-" />
              </RadioGroup>
            </FormControl>
            <TextField
              margin='normal'
              required
              fullWidth
              id='contact'
              name='contact'
              label='Contact'
              value={formData.contact}
              onChange={handleChange}
            />
            <Box textAlign='center'>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
            </Box>
          </Box>
          <img className='don' src={don} alt="placeholder" />
        </Box>
      </Box>
    </Box>
  );
};

export default MyForm;
