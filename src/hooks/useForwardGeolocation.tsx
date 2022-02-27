import React from 'react';

import axios from 'axios';

import { PlacesFields } from '../models/placesFields';

const useCoordinates = (cityName: string): { coordinateData: PlacesFields | undefined; isLoading: boolean } => {
    const [coordinateData, setCoordinateData] = React.useState<PlacesFields>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!cityName) return;

        const fetchData = async () => {
            setIsLoading(true);
            const response = await axios.get<PlacesFields>(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${process.env.REACT_APP_MAPBOX}
                  `,
            );
            setCoordinateData(response.data);
            setIsLoading(false);
        };

        fetchData();
    }, [cityName]);

    return { coordinateData, isLoading };
};

export { useCoordinates };
