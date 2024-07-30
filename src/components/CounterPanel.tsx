import React from 'react';

type CounterPanelPropsType = {
    numberValue: number
    className: string
};

export const CounterPanel = ({numberValue, className}: CounterPanelPropsType) => {
    return (
        <div className={className}>
            {numberValue}
        </div>
    );
};