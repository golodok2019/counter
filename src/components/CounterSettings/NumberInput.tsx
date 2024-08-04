import React from 'react';
import {TextField} from '@mui/material';

type Props = {
    labelText: string
    value: number
    onChange: (value: number) => void
    errorText: string
};

export const NumberInput = ({labelText, value, onChange, errorText}: Props) => {
    return (
        <TextField label={labelText} type={'number'} value={value} variant="outlined"
                   onChange={e => onChange(parseInt(e.currentTarget.value))}
                   error={!!errorText} helperText={errorText} />
    );
};