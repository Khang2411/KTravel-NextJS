import { FormControl, FormControlLabel, FormLabel, InputProps, Radio, RadioGroup, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Control, useController, UseControllerProps } from "react-hook-form";

interface RadioFieldProps extends UseControllerProps {
    type?: string,
    label?: React.ReactNode,
    control?: Control<any>,
    sx?: any
    value: string,
    circle: boolean
}

export default function RadioField(props: RadioFieldProps) {
    const { field, fieldState } = useController(props);
    return (
        <FormControlLabel
            {...field}
            value={props.value}
            control={<Radio sx={{ display: props.circle ? 'block' : 'none' }} />}
            sx={props?.sx}
            label={
                <>
                    {props.label}
                </>
            } />


    );
}
