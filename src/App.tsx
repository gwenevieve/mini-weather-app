import React from 'react';

import { Container, Box, Grid } from '@mui/material';

import { Coordinates } from './models/coordinates';
import { Features } from './models/placesFields';
import { WeatherDetails } from './models/weather';

import Tab from './components/Tab';
import LargeWeatherCard from './components/LargeWeatherCard';
import MiniWeatherCard from './components/MiniWeatherCard';

import { useCoordinates } from './hooks/useForwardGeolocation';
import { useWeather } from './hooks/useWeather';

import { ConvertToDay } from './utilities/ConvertDate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const App = (): JSX.Element => {
    const [location, setLocation] = React.useState<Coordinates | undefined>(undefined);
    const locationNames = ['Edmonton', 'The Hague', 'Nashville'];
    const [currentLocationName, setCurrentLocationName] = React.useState<string>(locationNames[0]);
    const { weatherData, isLoading } = useWeather(location?.latitude, location?.longitude);
    const { coordinateData } = useCoordinates(currentLocationName);

    React.useEffect(() => {
        if (coordinateData) {
            coordinateData.features.forEach((feature: Features) => {
                if (feature.place_type[0] === 'place' || feature.place_type[0] === 'region') {
                    setLocation({
                        latitude: feature.geometry.coordinates[1],
                        longitude: feature.geometry.coordinates[0],
                    });
                }
            });
        }
    }, [coordinateData]);

    React.useEffect(() => {
        if (weatherData) {
            weatherData?.daily.shift();
            weatherData?.daily.splice(4, 4);
        }
    }, [weatherData]);

    return (
        <Container maxWidth={false} sx={{ backgroundColor: '#edf6fa', height: '100vh' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {locationNames.map((locationName, index) => {
                    return (
                        <Tab
                            key={`tab-${index}`}
                            isActive={currentLocationName === locationName}
                            setCurrentLocationName={setCurrentLocationName}
                            currentLocationName={currentLocationName}
                            cityName={locationName}
                        />
                    );
                })}
            </Box>
            <Container
                disableGutters
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    borderRadius: 2,
                    minHeight: '443px',
                    border: '5px solid #ffffff',
                    boxShadow:
                        '0px 3px 5px rgb(0 0 0 / 8%), 0px 6px 10px rgb(0 0 0 / 8%), 0px 12px 20px rgb(0 0 0 / 8%)',
                }}
            >
                {weatherData && !isLoading ? (
                    <>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <LargeWeatherCard weatherData={weatherData} />
                            </Grid>
                            <Container disableGutters maxWidth="sm">
                                <Grid item xs={12} md={12}>
                                    <Grid container>
                                        {weatherData?.daily.map((element: WeatherDetails) => {
                                            return (
                                                <Grid
                                                    key={element.dt}
                                                    item
                                                    xs={12}
                                                    md={3}
                                                    sx={{
                                                        borderTop: '4px solid #ffffff',
                                                        borderRight: '4px solid #ffffff',
                                                        '&:last-child': {
                                                            borderRight: 'none',
                                                        },
                                                    }}
                                                >
                                                    <MiniWeatherCard
                                                        key={element.dt}
                                                        day={ConvertToDay(element.dt).substring(0, 3)}
                                                        icon={element?.weather[0].main}
                                                        temp={Math.round(element.temp.day)}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </>
                ) : (
                    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon spin={true} color="#5FB0E8" size="5x" icon={faSpinner} />
                    </Container>
                )}
            </Container>
        </Container>
    );
};

export default App;
