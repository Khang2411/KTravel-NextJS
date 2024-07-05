import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';
import { Control, useController } from "react-hook-form";

type InputFieldProps = TextFieldProps & {
    control: Control<any>;
    name: string,
    label?: string
}
export default function InputField({ control, name, onChange: externalOnChange, ...rest }: InputFieldProps) {
    const {
        field,
        fieldState,
    } = useController({
        name,
        control,
    });
    return (
        <>
            <TextField
                {...field}
                fullWidth
                name={name}
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onBlur={field.onBlur}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event) // onChange of React Hook Form
                    externalOnChange?.(event) // props onChange of ParentComponent
                }}
                {...rest}
            />
        </>
    );
}
