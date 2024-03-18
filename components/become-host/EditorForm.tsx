import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import EditorField from "../form/EditorField";
import { FooterBecomeHost } from "./";

type FormValues = {
    description: string,
};

interface EditorFormProps {
    onSubmit?: (payload: FormValues) => void,
}

const schema = yup.object().shape({
    description: yup.string().required("Nội dung là bắt buộc."),
});


export const EditorForm = ({ onSubmit }: EditorFormProps) => {
    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            description: '',
        },
        mode: "all"
    });

    const handleFormSubmit = async (payload: FormValues) => {
        console.log(123)
        await onSubmit?.(payload)
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
            <EditorField name="description" control={control} label="Full Description"></EditorField>
            <button type='submit'>124</button>
            <FooterBecomeHost progressInput={90} disabled={false} />
        </Box >
    );
}
