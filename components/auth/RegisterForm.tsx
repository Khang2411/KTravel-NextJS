import { useAuth } from '@/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, FormHelperText, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from '../form/InputField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

type FormValues = {
    email: string,
    name: string
    password: string,
    phone: string,
    password_confirmation: string
};

type RegisterFormProps = {
    handleClose: (value: boolean) => void
}

const schema = yup.object().shape({
    email: yup.string().email("Định dạng phải là Email").required("Email là bắt buộc."),
    name: yup.string().required("Tên là bắt buộc."),
    phone: yup
        .string()
        .matches(/^(\+84|84|0)[0-9]{9}$/, 'SĐT không hợp lệ')
        .required('Vui lòng nhập SĐT'),
    password: yup.string().min(8, "Mật khẩu tối thiểu 8 kí tự.").required(),
    password_confirmation: yup
        .string()
        .required('Vui lòng nhập Password')
        .min(8, 'Mật khẩu tối thiểu phải 8 ký tự')
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),

});

export const RegisterForm = ({ handleClose }: RegisterFormProps) => {
    const { register } = useAuth({})
    const [showPassword, setShowPassword] = React.useState(false)
    const [error, setError] = React.useState("")

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            name: "",
            phone: "",
            password: "",
            password_confirmation: ""
        },
        mode: "onChange"
    });
    const handleRegisterSubmit = async (data: FormValues) => {
        try {
            await register(data)
            toast.success('Đăng ký thành công.')
            handleClose(false)
        } catch (error: AxiosError | any) {
            setError(error.response?.data.message)
        }
    };

    return (
        <>
            <ToastContainer />
            <Box component='form' onSubmit={handleSubmit(handleRegisterSubmit)}>
                <Box sx=
                    {{
                        '& .MuiTextField-root': { mt: 1 },
                    }}>
                    <Box>
                        <FormHelperText error>{error}</FormHelperText>
                    </Box>
                    <InputField control={control} name="email" label='Email' />
                    <InputField control={control} name="name" label='Tên' />
                    <InputField control={control} name="phone" label='SĐT' />
                    <InputField control={control} name="password" label='Nhập mật khẩu' type={showPassword ? 'text' : 'password'}
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
                        }} />
                    <InputField control={control} name="password_confirmation" label='Nhập lại mật khẩu' type='password' />
                </Box>

                <Box mt={2}>
                    <Button type="submit" variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                        sx={{
                            backgroundColor: 'rgb(220,14,98) !important',
                            width: '100%',
                            borderRadius: '8px'
                        }}>
                        Đăng ký
                    </Button>
                </Box>

            </Box>
        </>

    );
}
