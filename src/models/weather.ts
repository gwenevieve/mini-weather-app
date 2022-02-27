import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface WeatherMainDetails {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface WeatherIconDetails {
    icon: IconProp;
    color: string;
}

export interface WeatherDetails {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
    };
    humidity: number;
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: {
        day: number;
        min: number;
        max: number;
        morn: number;
        night: number;
        eve: number;
    };
    uvi: number;
    weather: WeatherMainDetails[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
}

export interface WeatherFields {
    current: {
        temp: number;
        weather: WeatherMainDetails[];
    };
    daily: [weather: WeatherDetails];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
}
