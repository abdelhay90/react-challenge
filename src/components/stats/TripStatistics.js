/**
 * Trip statistics feature component
 */
import React, { useState } from 'react';
import { Box, Typography, AppBar, Tabs, Tab } from '@material-ui/core';
import PassengersStats from './PassengersStats';
import StationsStatistics from './StationsStatistics';
import { STATION_OPERATION_TYPE } from '../../lib/constants';
import PassengersPayslips from './PassengersPayslips';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

function TripStatistics() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography variant='h6'>Statistics</Typography>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='Trip Statistics' {...a11yProps(0)} />
          <Tab label='Payslip' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box display='flex' flexWrap='wrap'>
          <Box mx={1}>
            <PassengersStats />
          </Box>
          <Box mx={2}>
            <StationsStatistics type={STATION_OPERATION_TYPE.PICK_UP} />
          </Box>
          <Box mx={2}>
            <StationsStatistics type={STATION_OPERATION_TYPE.CHECK_OUT} />
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PassengersPayslips />
      </TabPanel>

      {/* <Box p={1} m={1}>
        <Typography variant="h6">Trips Statistics</Typography>
        <Box display='flex' flexWrap='wrap'>
          <Box>
            <PassengersStats/>
          </Box>
          <Box>
            <StationsStatistics type={STATION_OPERATION_TYPE.PICK_UP}/>
          </Box>
          <Box>
            <StationsStatistics type={STATION_OPERATION_TYPE.CHECK_OUT}/>
          </Box>
        </Box>
      </Box> */}
      {/* <Box p={1} m={1}>
        <PassengersPayslips/>
      </Box> */}
    </>
  );
}

export default TripStatistics;
