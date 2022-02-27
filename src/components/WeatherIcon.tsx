import React from 'react';

import { WeatherIconDetails } from '../models/weather';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faBolt, faCloud, faCloudRain, faSun, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';

const WeatherIcon = ({ image, size }: { image: string | undefined; size: SizeProp }): JSX.Element => {
    const [weatherImage, setWeatherImage] = React.useState<WeatherIconDetails>();
    React.useEffect(() => {
        switch (image) {
            case 'Thunderstorm':
                setWeatherImage({ icon: faBolt, color: '#5FB0E8' });
                break;
            case 'Clouds' || 'Scattered Clouds' || 'Broken Clouds' || 'Few Clouds':
                setWeatherImage({ icon: faCloud, color: '#5FB0E8' });
                break;
            case 'Rain' || 'Shower Rain':
                setWeatherImage({ icon: faCloudRain, color: '#5FB0E8' });
                break;
            case 'Clear':
                setWeatherImage({ icon: faSun, color: '#5FB0E8' });
                break;
            case 'Snow':
                setWeatherImage({ icon: faSnowflake, color: '#5FB0E8' });
                break;
            case 'Mist':
                setWeatherImage({ icon: faSmog, color: '#5FB0E8' });
                break;
        }
    }, [image]);
    return (
        <>{weatherImage ? <FontAwesomeIcon size={size} color={weatherImage.color} icon={weatherImage.icon} /> : null}</>
    );
};

export default WeatherIcon;
