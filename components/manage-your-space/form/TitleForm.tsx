'use client'
import InputField from "@/components/form/InputField";
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type TitleFormProps = {
    onSubmit?: (payload: any) => void,
    handleToggle?: () => void,
    title: string
}

const schema = yup.object({
    title: yup.string().required("Tiêu đề là bắt buộc.").max(500, 'Không vượt quá 500 ký tự'),
}).required();


export const TitleForm = ({ onSubmit, handleToggle, title }: TitleFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm<{ title: string }>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: title,
        },
    });
    const handleTitleSubmit = async (payload: { title: string }) => {
        await onSubmit?.(payload)

    };
    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handleTitleSubmit)} sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }}>
                <IconButton aria-label="delete" onClick={handleToggle}
                    sx={{ position: 'absolute', right: '10px', top: '0' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Box marginBottom={2}><Typography fontWeight={600}>Tiêu đề</Typography></Box>
                <Box>
                    <InputField control={control} name="title" label='Tiêu đề' rows={8} multiline={true} />
                </Box>
                <Box sx={{ paddingBlock: '24px' }}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Button variant="text" onClick={handleToggle}>Hủy</Button>
                        <Button type="submit" variant="contained"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null} sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}