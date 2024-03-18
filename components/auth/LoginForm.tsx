import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import * as React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from '../form/InputField';
import { useAuth } from '@/hook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
    email: string,
    password: string,
};

type LoginFormProps = {
    handleClose: (value: boolean) => void
}

const schema = yup.object({
    email: yup.string().email("Định dạng phải là Email").required("Email là bắt buộc."),
    password: yup.string().min(8, "Mật khẩu tối thiểu 8 kí tự.").required(),
}).required();

export const LoginForm = ({ handleClose }: LoginFormProps) => {
    const { login } = useAuth({})

    const [showPassword, setShowPassword] = React.useState(false)

    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    const handleLoginSubmit = async (data: FormValues) => {
        try {
            await login(data)
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
    );
}
