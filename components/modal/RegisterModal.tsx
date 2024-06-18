import { Box, Button, Divider, Typography } from '@mui/material';
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RegisterForm } from '../auth';
import { ModalLayout } from './';
import { useContext } from 'react';
import { ModalContext } from '../common/header/UserMenu';

export const RegisterModal = () => {
    const { openRegModal, setOpenRegModal } = useContext(ModalContext);;

    const bodyContent = <RegisterForm handleClose={() => setOpenRegModal(false)} />
    const footerContent = (
        <>
            <Divider></Divider>
            <Box sx={{
                '& > button': {
                    mt: 1,
                    borderRadius: '8px',
                    backgroundColor: '#ffffff !important',
                    width: '100%',
                    color: '#000000',
                    border: '1px solid #222222',
                }
            }}>
                <Button type="submit" variant="contained">
                    <FcGoogle size={20} />
                    <Typography fontSize={14} fontWeight={600} sx={{ flexGrow: 1 }}>Tiếp tục với Google</Typography>
                </Button>
            </Box>
        </>
    )
    
    return (
        // <button onClick={() => { signIn('github') }}>Sign in</button>
        <ModalLayout
            openModal={openRegModal}
            handleOpen={() => setOpenRegModal(true)}
            handleClose={() => setOpenRegModal(false)}
            title='Đăng ký'
            heading='Chào mừng đến với Airbnb'
            bodyContent={bodyContent}
            footerContent={footerContent}
        />
    )
}
