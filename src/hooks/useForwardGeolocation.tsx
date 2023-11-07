import axios from 'axios';
import React from 'react';
import { PlacesFields } from '../models/placesFields';

const useCoordinates = (
  cityName: string,
): {
  coordinateData: PlacesFields | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
} => {
  const [coordinateData, setCoordinateData] = React.useState<PlacesFields>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMesssage] = React.useState<string>('');

  React.useEffect(() => {
    if (!cityName) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<PlacesFields>(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${process.env.REACT_APP_MAPBOX}
                      `,
        );
        setCoordinateData(response.data);
        setIsLoading(false);
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
  }, [cityName]);

  return { coordinateData, isLoading, isError, errorMessage };
};

export { useCoordinates };
