import { Card, Typography } from '@mui/material';

import Icon from './WeatherIcon';

const MiniWeatherCard = ({ day, icon, temp }: { day: string; icon: string; temp: number }): JSX.Element => {
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
            <Icon size="3x" image={icon} />
            <Typography sx={{ pt: 2 }} variant="tempSmall">{`${temp}°`}</Typography>
        </Card>
    );
};

export default MiniWeatherCard;
