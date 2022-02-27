import React from 'react';

import { Button } from '@mui/material';

const Tab = ({
    cityName,
    isActive,
    setCurrentLocationName,
}: {
    cityName: string;
    currentLocationName: string;
    isActive: boolean;
    setCurrentLocationName: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
    return (
        <Button
            disableRipple
            variant="text"
            sx={{
                my: 1,
                px: 3,
                color: isActive ? '#5fb0e8' : '#333338',
                fontWeight: isActive ? '700' : '300',
                border: '2px solid transparent',
                '&:focus': {
                    border: '2px solid #5fb0e8',
                },
            }}
            onClick={() => {
                setCurrentLocationName(cityName);
            }}
        >
            {cityName}
        </Button>
    );
};

export default Tab;
