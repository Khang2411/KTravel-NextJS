'use client'
import InputField from "@/components/form/InputField";
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FooterBecomeHost } from './FooterBecomeHost';
import EditorField from "../form/EditorField";

type DescriptionFormProps = {
    onSubmit?: (payload: any) => void,
    id: number
};
const schema = yup.object({
    description: yup.string().required("Nội dung là bắt buộc.")
}).required();


export const DescriptionForm = ({ onSubmit, id }: DescriptionFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm<{ description: string }>({
        resolver: yupResolver(schema),
        defaultValues: {
            description: "",
        },
    });
    const handleDescriptionSubmit = async (payload: { description: string }) => {
        console.log(payload)
        await onSubmit?.(payload)

    };
    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handleDescriptionSubmit)}>
                <Box>
                    <EditorField name="description" control={control} label="Mô tả"></EditorField>
                </Box>
                <Box mt={5}>
                    <FooterBecomeHost progressInput={80} disabled={isSubmitting} backTo={`/become-host/${id}/title`} />
                </Box>
            </Box>
        </Box>
    )
}