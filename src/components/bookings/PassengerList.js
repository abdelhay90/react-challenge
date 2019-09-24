/**
 * list of all passenger in the trip with collapsible capability
 */
import React, { useState } from 'react';
import { Box, Button, Collapse } from '@material-ui/core';
import Passenger from './Passenger';

const PassengersList = ({ passengers }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(prev => !prev);
  };
  return (
    <>
      <Collapse in={collapsed} collapsedHeight='300px'>
        <Box display='flex' flexWrap='wrap' p={1} m={1}>
          {passengers.map(passenger => (
            <Passenger
              key={passenger.id}
              id={passenger.id}
              name={passenger.name}
              status={passenger.status}
              paymentMethod={passenger.paymentMethod}
              imageUrl={passenger.imageUrl}
            />
          ))}
        </Box>
      </Collapse>
      <Button
        variant='contained'
        size='small'
        color='primary'
        style={{ left: '50%' }}
        onClick={toggle}
      >
        {!collapsed ? 'View More' : 'View Less'}
      </Button>
    </>
  );
};

export default PassengersList;
