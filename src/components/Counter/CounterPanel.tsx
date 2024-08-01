import React from 'react';

type CounterPanelPropsType = {
    value: string
    className: string
};

export const CounterPanel = ({value, className}: CounterPanelPropsType) => {
    return (
        <div className={className}>
            {value}
        </div>
    );
};