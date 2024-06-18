
import { Country, CountryResponse } from '@/models';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import * as React from 'react';
import { Control, useController } from "react-hook-form";

type SelectFieldProps = SelectProps & {
    control: Control<any>;
    name: string,
    options?: [] | Array<CountryResponse<Country | any>>
}

export function SelectField({ control, name, label, options, onChange: externalOnChange, ...rest }: SelectFieldProps) {
    const {
        field,
        fieldState,
    } = useController({
        name,
        control
    });
    return (
        <FormControl fullWidth>

            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                label={label}
                id="demo-simple-select"
                name={name}
                value={field.value}
                error={!!fieldState.error}
                onChange={(event, child) => {
                    field.onChange(event) // onChange of React Hook Form
                    externalOnChange?.(event, child) // props onChange of ParentComponent
                }}
                {...rest}
            >
                {options?.map((item, index: React.Key) =>
                    <MenuItem key={index} value={item.name?.common ? item.name?.common : item.id}>{item.name?.common ? item.name?.common : item.name}</MenuItem>
                )}
            </Select>
            <FormHelperText sx={{ color: '#D84949' }}>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}
