import { Card, Typography } from '@mui/material';
import { convertToFarenheit } from '../utilities/convertTemperature';
import WeatherIcon from './weatherIcon';

const MiniWeatherCard = ({
  day,
  icon,
  temp,
  temperatureUnit,
}: {
  day: string;
  icon: string;
  temp: number;
  temperatureUnit: string;
}): JSX.Element => {
  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: 0,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#edf6fa',
        py: 3,
        px: 6,
      }}
    >
      <Typography sx={{ pb: 2 }} variant="cardSmall">
        {day}
      </Typography>
      <WeatherIcon size="3x" image={icon} />
      <Typography sx={{ pt: 2 }} variant="tempSmall">{`${
        temperatureUnit.toUpperCase() === 'F' ? convertToFarenheit(temp) : temp
      }°`}</Typography>
    </Card>
  );
};

export default MiniWeatherCard;
