'use client'
import { useAuth } from '@/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import InputField from '../form/InputField';

type ResetPasswordPayload = {
    email: string
    password: string,
    password_confirmation: string,
    token: string,
}
export function ResetPasswordForm() {
    const { resetPassword } = useAuth({})
    const searchParams = useSearchParams()

    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Không được trống')
            .email(),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu')
            .min(8, 'Mật khẩu tối thiểu phải 8 ký tự'),
        password_confirmation: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu')
            .min(8, 'Mật khẩu tối thiểu phải 8 ký tự'),
        token: yup
            .string()
            .nullable()
            .required('Không được trống')
    })
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ResetPasswordPayload>({
        defaultValues: {
            token: searchParams.get('token') || "",
            email: decodeURI(searchParams.get('email') || "") || "",
            password: '',
            password_confirmation: '',
        },
        resolver: yupResolver(schema),
    })

    async function handleResetSubmit(payload: ResetPasswordPayload) {
        try {
            await resetPassword(payload)
            toast.success('Đạt lại mật khẩu thành công', {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Zoom,
            });
            
            setTimeout(() => {
                router.push('/')
            }, 1000)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status)
                console.error(error.response);
                setErrorMessage(error.response?.data.message);
            }
        }
    }
    return (
        <>
            <ToastContainer />
            <Box component="form" onSubmit={handleSubmit(handleResetSubmit)} sx={{ mt: 3 }}>
                <Box mb={2}>
                    <InputField name="email" label="Email" control={control} />
                    <Box>
                        <FormHelperText error={errorMessage ? true : false}>{errorMessage}</FormHelperText>
                    </Box>
                </Box>

                <Box mb={2}>
                    <InputField name="password" label="Mật khẩu" control={control} type='password' />
                </Box>

                <Box mb={2}>
                    <InputField name="password_confirmation" label="Nhập lại mật khẩu" control={control} type='password' />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                    sx={{
                        mt: 3, mb: 2, backgroundColor: 'rgb(229 231 235) !important',
                        color: '#000000', fontWeight: '600', float: 'right', letterSpacing: '0.1em', fontSize: '0.75rem'
                    }}>
                    Đặt lại mật khẩu
                </Button>
            </Box>
        </>
    );
}