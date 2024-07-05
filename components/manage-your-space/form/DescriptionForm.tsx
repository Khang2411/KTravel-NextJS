'use client'
import EditorField from "@/components/form/EditorField";
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type DescriptionFormProps = {
    onSubmit?: (payload: any) => void,
    handleToggle?: () => void,
    description: string
};
const schema = yup.object({
    description: yup.string().required("Nội dung là bắt buộc.")
}).required();


export const DescriptionForm = ({ onSubmit, handleToggle, description }: DescriptionFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm<{ description: string }>({
        resolver: yupResolver(schema),
        defaultValues: {
            description: description,
        },
    });
    
    const handleDescriptionSubmit = async (payload: { description: string }) => {
        await onSubmit?.(payload)
    };

    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handleDescriptionSubmit)} sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }}>
                <IconButton aria-label="delete" onClick={handleToggle}
                    sx={{ position: 'absolute', right: '10px', top: '0' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Box>
                    <EditorField name="description" control={control} label="Mô tả"></EditorField>
                </Box>
                <Box sx={{ paddingBlock: '35px', marginBlockStart: '35px' }}>
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