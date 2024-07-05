'use client'
import { useAuth } from '@/hook';
import { decodeUrl } from '@/utils/url';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, InputAdornment, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import InputField from '../form/InputField';
import Link from 'next/link';

type LoginFormProps = {
    handleClose: (value: boolean) => void
}

const schema = yup.object({
    email: yup.string().email("Định dạng phải là Email").required("Email là bắt buộc."),
    password: yup.string().min(8, "Mật khẩu tối thiểu 8 kí tự.").required(),
}).required();

export const LoginForm = ({ handleClose }: LoginFormProps) => {
    const { login } = useAuth({})
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
    const router = useRouter()

    const [showPassword, setShowPassword] = React.useState(false)

    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleLoginSubmit = async (data: { email: string, password: string }) => {
        try {
            await login(data)
            const backTo = searchParams?.get('back_to') && decodeUrl(searchParams?.get('back_to') as string)
            if (backTo) {
                router.push(backTo)
            } else {
                location.reload();
            }
            handleClose(false)
        } catch (error: unknown) {
            toast.error('Tài khoản hoặc mật khẩu không chính xác.')
        }
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleLoginSubmit)}>
            <ToastContainer />
            <Box sx=
                {{
                    '& .MuiTextField-root': { mt: 1 },
                }}>
                <InputField control={control} name="email" label='Email' />
                <InputField control={control} name="password" label='Password' type={showPassword ? 'text' : 'password'}
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

            <Box mt={1} textAlign={'right'}>
                    <Link href="/forgot-password"><Typography component={'span'} fontSize={13} color={'#1877f2'}>Quên mật khẩu</Typography></Link>
            </Box>

            <Box mt={1}>
                <Button type="submit" variant="contained"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                    sx={{
                        backgroundColor: 'rgb(220,14,98) !important',
                        width: '100%',
                        borderRadius: '8px'
                    }}>
                    Đăng nhập
                </Button>
            </Box>
        </Box>
    );
}
