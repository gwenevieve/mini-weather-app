import React from 'react';

import { Box, Card, Typography } from '@mui/material';

import { convertToFarenheit } from '../utilities/convertTemperature';

import { WeatherFields } from '../models/weather';

import Icon from './weatherIcon';

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
            setCurrentTemp(weatherData?.current.temp);
            setCurrentWeatherIcon(weatherData?.current?.weather[0].main);
            setCurrentConditions(weatherData?.current?.weather[0].main);
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size="6x" image={currentWeatherIcon} />
                <Box sx={{ flexDirection: 'column', display: 'flex', pl: 2 }}>
                    <Typography variant="tempBig">{`${
                        temperatureUnit === 'F'
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
