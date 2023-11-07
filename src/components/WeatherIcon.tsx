import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBolt,
  faCloud,
  faCloudRain,
  faSmog,
  faSnowflake,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { WeatherIconDetails } from '../models/weather';

const WeatherIcon = ({
  image,
  size,
}: {
  image: string | undefined;
  size: SizeProp;
}): JSX.Element => {
  const [weatherImage, setWeatherImage] = React.useState<WeatherIconDetails>();
  React.useEffect(() => {
    switch (image) {
      case 'Thunderstorm':
        setWeatherImage({ icon: faBolt, color: '#5FB0E8' });
        break;
      case 'Clouds':
      case 'Scattered Clouds':
      case 'Broken Clouds':
      case 'Few Clouds':
        setWeatherImage({ icon: faCloud, color: '#5FB0E8' });
        break;
      case 'Rain':
      case 'Shower Rain':
        setWeatherImage({ icon: faCloudRain, color: '#5FB0E8' });
        break;
      case 'Clear':
        setWeatherImage({ icon: faSun, color: '#5FB0E8' });
        break;
      case 'Snow':
        setWeatherImage({ icon: faSnowflake, color: '#5FB0E8' });
        break;
      case 'Fog':
      case 'Mist':
        setWeatherImage({ icon: faSmog, color: '#5FB0E8' });
        break;
    }
  }, [image]);
  return (
    <>
      {weatherImage && (
        <FontAwesomeIcon
          size={size}
          color={weatherImage.color}
          icon={weatherImage.icon}
        />
      )}
    </>
  );
};

export default WeatherIcon;
