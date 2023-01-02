import React from 'react';

import axios from 'axios';

import { WeatherFields } from '../models/weather';

const useWeather = (
    lat: number | undefined,
    lon: number | undefined,
): { weatherData: WeatherFields | undefined; isLoading: boolean; isError: boolean; errorMessage: string } => {
    const [weatherData, setWeatherData] = React.useState<WeatherFields>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMesssage] = React.useState<string>('');

    React.useEffect(() => {
        if (!lat && !lon) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<WeatherFields>(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER}`,
                );
                setWeatherData(response.data);
            } catch (err: unknown) {
                setIsError(true);
                if (axios.isAxiosError(err)) {
                    setErrorMesssage(err?.response?.data?.message);
                } else {
                    setErrorMesssage('An error occured. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [lat, lon]);

    return { weatherData, isLoading, isError, errorMessage };
};

export { useWeather };
