'use client'
import InputField from "@/components/form/InputField";
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type AccountNameFormProps = {
    onSubmit?: (payload: any) => void,
    handleToggle?: () => void,
    name: string
}

const schema = yup.object({
    name: yup.string().required("Tên là bắt buộc.").max(50, 'Không vượt quá 50 ký tự'),
}).required();


export const AccountNameForm = ({ onSubmit, handleToggle, name }: AccountNameFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm<{ name: string }>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: name,
        },
    });

    const handleNameSubmit = async (payload: { name: string }) => {
        await onSubmit?.(payload)

    };
    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handleNameSubmit)} sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }}>
                <IconButton aria-label="delete" onClick={handleToggle}
                    sx={{ position: 'absolute', right: '10px', top: '0' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Box marginBottom={2}><Typography fontWeight={600}>Tên người dùng</Typography></Box>
                <Box>
                    <InputField control={control} name="name" label='Tên người dùng'/>
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