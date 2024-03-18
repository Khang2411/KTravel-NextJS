import { LoginForm } from '@/components/auth';
import { ModalLayout } from '@/components/modal';
import { Box, Button, Divider, Typography } from '@mui/material';
import { signIn } from "next-auth/react";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useModalContext } from '../common/header/UserMenu';


export const LoginModal = () => {
    const { openLoginModal, setOpenLoginModal } = useModalContext();
    const bodyContent = <LoginForm handleClose={() => setOpenLoginModal(false)}/>
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
                <Button
                    onClick={() => signIn("facebook")}
                    type="submit"
                    variant="contained"
                    sx={{ display: 'flex' }}>
                    <AiFillFacebook color='rgb(39,128,243)' size={20} />
                    <Typography fontSize={14} fontWeight={600} sx={{ flexGrow: 1 }}>Tiếp tục với Facebook</Typography>
                </Button>

                <Button
                    onClick={() => signIn("google")}
                    type="submit"
                    variant="contained">
                    <FcGoogle size={20} />
                    <Typography fontSize={14} fontWeight={600} sx={{ flexGrow: 1 }}>Tiếp tục với Google</Typography>
                </Button>
            </Box>
        </>
    )
    return (
        <ModalLayout
            openModal={openLoginModal} //openLoginModal
            handleOpen={() => setOpenLoginModal(true)}
            handleClose={() => setOpenLoginModal(false)}
            title='Đăng nhập'
            heading='Chào mừng đến với Airbnb'
            bodyContent={bodyContent}
            footerContent={footerContent}
        />
    )
}
