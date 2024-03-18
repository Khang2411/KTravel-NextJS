import { useAuth } from '@/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import * as React from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import InputField from '../form/InputField';

type FormValues = {
    email: string,
    name: string
    password: string,
    password_confirmation: string
};
const schema = yup.object().shape({
    email: yup.string().email("Định dạng phải là Email").required("Email là bắt buộc."),
    name: yup.string().required("Tên là bắt buộc."),
    password: yup.string().min(8, "Mật khẩu tối thiểu 8 kí tự.").required(),
    password_confirmation: yup
        .string()
        .required('Vui lòng nhập Password')
        .min(8, 'Mật khẩu tối thiểu phải 8 ký tự')
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),

});

export const RegisterForm = () => {
    const { register } = useAuth({})
    const [showPassword, setShowPassword] = React.useState(false)

    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            password_confirmation: ""
        },
        mode: "onChange"
    });
    const handleRegisterSubmit = async (data: FormValues) => {
        try {
            await register(data)
            //  handleClose(false)
            toast.success('Đăng ký thành công.')
        } catch (error: unknown) {
            console.log(error)
            toast.error('Tài khoản đã tồn tại.')
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
                        <InputField control={control} name="email" label='Email' />
                    </Box>
                    <InputField control={control} name="name" label='Tên' />
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
                    <InputField control={control} name="password_confirmation" label='Nhập lại mật khẩu' type='password'/>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" sx={{
                        backgroundColor: 'rgb(220,14,98) !important',
                        width: '100%',
                        borderRadius: '8px'
                    }}>
                        Tiếp tục
                    </Button>
                </Box>

            </Box>
        </>

    );
}
