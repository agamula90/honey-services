import React from 'react';
import { CircularProgress } from '@mui/material';

export default function DefaultProgressBar() {
    return (
        <div
            style={{
                width: 50,
                height: 50,
                marginInline: 'auto',
                marginBlock: 10,
                color: 'var(--nav-color)',
            }}
        >
            <CircularProgress color={'inherit'} />
        </div>
    );
}
