'use client'
import InputField from "@/components/form/InputField";
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type AccountPhoneFormProps = {
    onSubmit?: (payload: any) => void,
    handleToggle?: () => void,
    phone: string
}

const schema = yup.object().shape({
    phone: yup
        .string()
        .matches(/^(\+84|84|0)[0-9]{9}$/, 'SĐT không hợp lệ')
        .required('Vui lòng nhập SĐT')
})


export const AccountPhoneForm = ({ onSubmit, handleToggle, phone }: AccountPhoneFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm<{ phone: string }>({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: phone,
        },
    });

    const handlePhoneSubmit = async (payload: { phone: string }) => {
        await onSubmit?.(payload)
    };

    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handlePhoneSubmit)} sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }}>
                <IconButton aria-label="delete" onClick={handleToggle}
                    sx={{ position: 'absolute', right: '10px', top: '0' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Box marginBottom={2}><Typography fontWeight={600}>Số Điện Thoại</Typography></Box>
                <Box>
                    <InputField control={control} name="phone" label='SĐT' />
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