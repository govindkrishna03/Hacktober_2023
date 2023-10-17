import { Card, Tabs, Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
import Registration from './Registration';
import UserLogin from './UserLogin';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}

const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'radial-gradient(circle, rgba(158,0,0,0.8883928571428571) 0%, rgba(0,0,0,0.9780287114845938) 90%)' }}>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <Box sx={{ mx: 3, height: 530 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
              <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
              {/* <Tab label='Registration' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <UserLogin />
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
            <Registration />
          </TabPanel> */}
        </Box>
        <Box textAlign='center' sx={{ mt: 2 }}>
          {/* <ShoppingBag sx={{ color: 'purple', fontSize: 100 }} /> */}
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>BloodDonation</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginReg;
