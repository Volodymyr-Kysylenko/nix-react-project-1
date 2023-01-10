import React from 'react';

export default function Spinner({loading}) {
    return (
        <div className='photogramm-spinner' style={loading ? null : { display: 'none' }}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    );
}