import { FormControl, InputLabel, MenuItem, NativeSelect, Select, Theme, ThemeProvider, createTheme, useTheme } from '@mui/material';
import * as React from 'react';
import { Control, useController, UseControllerProps } from "react-hook-form";

export interface SelectFieldProps extends UseControllerProps {
    label?: string,
    control?: Control<any>
}

export default function SelectField(props: SelectFieldProps) {
    const { field } = useController(props);
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={props.name}
                // value={age}
                label="Age"
                // onChange={handleChange}
            >
                <MenuItem value={10}>Ten fef e</MenuItem>
                <MenuItem value={20}>Twenty few f</MenuItem>
                <MenuItem value={30}>Thirty few f</MenuItem>
            </Select>
        </FormControl>
    );
}
