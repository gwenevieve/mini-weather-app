import {
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import {
  LargeWeatherCard,
  MiniWeatherCard,
  Tab,
  TemperatureToggle,
} from './components';
import { useCoordinates } from './hooks/useForwardGeolocation';
import { useWeather } from './hooks/useWeather';
import { Coordinates } from './models/coordinates';
import { Features } from './models/placesFields';
import { WeatherDetails } from './models/weather';
import { convertToDay } from './utilities/convertDate';

const App = (): JSX.Element => {
  const [location, setLocation] = React.useState<Coordinates | undefined>(
    undefined,
  );
  const locationNames: Array<string> = ['Edmonton', 'The Hague', 'Nashville'];
  const [currentLocationName, setCurrentLocationName] = React.useState<string>(
    locationNames[0],
  );
  const [temperatureUnit, setTemperatureUnit] = React.useState<string>('C');
  const {
    weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    errorMessage: weatherErrorMessage,
  } = useWeather(location?.latitude, location?.longitude);
  const {
    coordinateData,
    isLoading: isCoordinatesLoading,
    isError: isCoordinatesError,
    errorMessage: coordinatesErrorMessage,
  } = useCoordinates(currentLocationName);

  // Takes the name of the first item in the locationNames array
  // and then attempts to get the coordinates from the Mapbox result
  React.useEffect(() => {
    if (coordinateData) {
      coordinateData.features.forEach((feature: Features) => {
        if (
          feature.place_type[0] === 'place' ||
          feature.place_type[0] === 'region'
        ) {
          setLocation({
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          });
        }
      });
    }
  }, [coordinateData]);

  // Gets the weather and adjusts the data so that we're
  // only getting the next 4 days instead of the next 7.
  React.useEffect(() => {
    if (!isCoordinatesError && weatherData) {
      weatherData?.daily.shift();
      weatherData?.daily.splice(4, 4);
    }
  }, [weatherData]);

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: '#edf6fa', height: '100vh' }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
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
        {weatherData && !isWeatherLoading && (
          <>
            <Grid container>
              <TemperatureToggle
                temperatureUnit={temperatureUnit}
                setTemperatureUnit={setTemperatureUnit}
              />
              <Grid item xs={12} md={12}>
                <LargeWeatherCard
                  temperatureUnit={temperatureUnit}
                  weatherData={weatherData}
                />
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
                            temperatureUnit={temperatureUnit}
                            key={element.dt}
                            day={convertToDay(element.dt).substring(0, 3)}
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
        )}
        {(isCoordinatesLoading && !isCoordinatesError) ||
          (isWeatherLoading && !isWeatherError && (
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon
                spin={true}
                color="#5FB0E8"
                size="5x"
                icon={faSpinner}
              />
            </Container>
          ))}
        {(!isCoordinatesLoading || !isWeatherLoading) &&
          (isCoordinatesError || isWeatherError) && (
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <FontAwesomeIcon
                color="#5FB0E8"
                size="5x"
                icon={faExclamationTriangle}
              />
              <Typography sx={{ pt: 3 }} variant="cardBig" textAlign="center">
                {isCoordinatesError && coordinatesErrorMessage}
                {isWeatherError && weatherErrorMessage}
              </Typography>
            </Container>
          )}
      </Container>
    </Container>
  );
};

export default App;
