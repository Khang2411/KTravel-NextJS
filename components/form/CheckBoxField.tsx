import { Checkbox, CheckboxProps } from '@mui/material';
import * as React from 'react';
import { Control, useController } from "react-hook-form";

type CheckBoxFieldProps = CheckboxProps & {
    options?: any,
    control: Control<any>
    name: string

}

export default function CheckBoxField({ options, control, name, onChange: externalOnChange, ...rest }: CheckBoxFieldProps) {
    const {
        field,
        fieldState,
    } = useController({
        name,
        control,
    });

    const [value, setValue] = React.useState(field.value || []);
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: { target: { value: string, checked: boolean; }; }) => {
        setChecked(event.target.checked);
        if (event.target.checked === false) {
            field.onChange(0);
        } else {
            field.onChange(event.target.value);
            setValue(event.target.value);
        }
    }
    return (
        <>
            {typeof (options) !== 'string' ? options.map((option: string, index: number) => (
                <Checkbox
                    onChange={(e) => {
                        const valueCopy = [...value];
                        // update checkbox value
                        valueCopy[index] = e.target.checked ? e.target.value : null;
                        // send data to react hook form
                        field.onChange(valueCopy);
                        // update local state
                        setValue(valueCopy);
                    }}
                    key={option}
                    checked={value.includes(option)}
                    value={option}
                    {...rest}
                />
            )) : <Checkbox
                value={value}
                checked={checked}
                onChange={handleChange}
                {...rest}
            />}
        </>
    );
}
