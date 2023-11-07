import { Button, Container } from '@mui/material';
import React from 'react';

const TemperatureToggle = ({
  setTemperatureUnit,
  temperatureUnit,
}: {
  setTemperatureUnit: React.Dispatch<React.SetStateAction<string>>;
  temperatureUnit: string;
}): JSX.Element => {
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Button
        disableRipple
        variant="text"
        sx={{
          fontSize: 24,
          color: '#333338',
          fontWeight: temperatureUnit === 'C' ? '700' : '300',
          border: '2px solid transparent',
          '&:focus': {
            border: '2px solid #5fb0e8',
          },
          '&:hover': {
            backgroundColor: '#5fb0e830',
          },
        }}
        onClick={() => {
          setTemperatureUnit('C');
        }}
      >
        C
      </Button>
      <Button
        disableRipple
        variant="text"
        sx={{
          fontSize: 24,
          color: '#333338',
          fontWeight: temperatureUnit === 'F' ? '700' : '300',
          border: '2px solid transparent',
          '&:focus': {
            border: '2px solid #5fb0e8',
          },
          '&:hover': {
            backgroundColor: '#5fb0e830',
          },
        }}
        onClick={() => {
          setTemperatureUnit('F');
        }}
      >
        F
      </Button>
    </Container>
  );
};

export default TemperatureToggle;
