import React, {ButtonHTMLAttributes} from 'react';
import Button from '@mui/material/Button'

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>;

export const MaterialButton = (props: ButtonPropsType) => {
    return (
        <Button variant="outlined" onClick={props.onClick} disabled={props.disabled}>{props.title}</Button>
    );
};