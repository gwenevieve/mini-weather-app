import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { WeatherFields } from '../models/weather';
import { convertToFarenheit } from '../utilities/convertTemperature';
import WeatherIcon from './weatherIcon';

const LargeWeatherCard = ({
  weatherData,
  temperatureUnit,
}: {
  weatherData?: WeatherFields;
  temperatureUnit: string;
}): JSX.Element => {
  const [currentWeatherIcon, setCurrentWeatherIcon] = React.useState<string>();
  const [currentTemp, setCurrentTemp] = React.useState<number>();
  const [currentConditions, setCurrentConditions] = React.useState<string>('');

  React.useEffect(() => {
    if (weatherData) {
      const { current: currentWeather } = weatherData;
      setCurrentTemp(currentWeather.temp);
      setCurrentWeatherIcon(currentWeather.weather[0].main);
      setCurrentConditions(currentWeather.weather[0].main);
    }
  }, [weatherData]);

  return (
    <Card
      sx={{
        boxShadow: 0,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#edf6fa',
        py: 6,
      }}
    >
      <Typography sx={{ pb: 3 }} variant="cardBig">
        Today
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <WeatherIcon size="6x" image={currentWeatherIcon} />
        <Box sx={{ flexDirection: 'column', display: 'flex', pl: 2 }}>
          <Typography variant="tempBig">{`${
            temperatureUnit.toUpperCase() === 'F'
              ? convertToFarenheit(Math.round(currentTemp as number))
              : Math.round(currentTemp as number)
          }°`}</Typography>
          <Typography variant="cardBig">{currentConditions}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default LargeWeatherCard;
