'use client'
import InputField from "@/components/form/InputField";
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FooterBecomeHost } from './FooterBecomeHost';

type TitleFormProps = {
    onSubmit?: (payload: any) => void,
    id: number
};
const schema = yup.object({
    title: yup.string().required("Tiêu đề là bắt buộc.").max(500, 'Không vượt quá 500 ký tự'),
}).required();


export const TitleForm = ({ onSubmit, id }: TitleFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm<{ title: string }>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
        },
    });
    const handleTitleSubmit = async (payload: { title: string }) => {
        await onSubmit?.(payload)

    };
    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handleTitleSubmit)}>
                <Box>
                    <InputField control={control} name="title" label='Tiêu đề' rows={8} multiline={true} />
                </Box>
                <Box mt={5}>
                    <FooterBecomeHost progressInput={70} disabled={isSubmitting} backTo={`/become-host/${id}/photos`}/>
                </Box>
            </Box>
        </Box>
    )
}