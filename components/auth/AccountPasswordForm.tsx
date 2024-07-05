'use client'
import InputField from "@/components/form/InputField";
import { yupResolver } from '@hookform/resolvers/yup';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type AccountPasswordFormProps = {
    onSubmit?: (payload: any) => void,
    handleToggle?: () => void,
}

const schema = yup.object().shape({
    password_current: yup
        .string()
        .required('Vui lòng nhập Password')
        .min(8, 'Mật khẩu tối thiểu phải 8 ký tự'),
    password: yup
        .string()
        .required('Vui lòng nhập Password')
        .min(8, 'Mật khẩu tối thiểu phải 8 ký tự'),
    password_confirmation: yup
        .string()
        .required('Vui lòng nhập Password')
        .min(8, 'Mật khẩu tối thiểu phải 8 ký tự')
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
})

export const AccountPasswordForm = ({ onSubmit, handleToggle }: AccountPasswordFormProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            password_current: '',
            password: '',
            password_confirmation: ''
        },
    });

    const handlePasswordSubmit = async (payload: { password_current: string, password: string, password_confirmation: string }) => {
        await onSubmit?.(payload)
    };

    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handlePasswordSubmit)} sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }}>
                <IconButton aria-label="delete" onClick={handleToggle}
                    sx={{ position: 'absolute', right: '10px', top: '0' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Box marginBottom={2}><Typography fontWeight={600}>Mật khẩu</Typography></Box>

                <Box mb={2}>
                    <InputField
                        type={'password'}
                        name="password_current"
                        label="Mật khẩu hiện tại"
                        control={control}
                    />
                </Box>

                <Box>
                    <InputField
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        label="Mật khẩu mới"
                        control={control}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword((x) => !x)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box marginBlockStart={'15px'}>
                    <InputField
                        type={showPasswordConfirm ? 'text' : 'password'}
                        name="password_confirmation"
                        label="Nhập lại mật khẩu mới"
                        control={control}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPasswordConfirm((x) => !x)}
                                        edge="end"
                                    >
                                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
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