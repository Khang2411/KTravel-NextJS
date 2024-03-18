import * as React from 'react';
import { useModalContext } from '../common/header/UserMenu';
import { useSession, signIn, signOut } from "next-auth/react"
import { Box, Button, Divider, Typography } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiFillGithub } from "react-icons/ai";
import { RegisterForm } from '../auth';
import { ModalLayout } from './';

export const RegisterModal = () => {
    const { openRegModal, setOpenRegModal } = useModalContext();
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session?.user?.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    const bodyContent = <RegisterForm />
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
                    type="submit"
                    variant="contained"
                    sx={{ display: 'flex' }}>
                    <AiFillFacebook color='rgb(39,128,243)' size={20} />
                    <Typography fontSize={14} fontWeight={600} sx={{ flexGrow: 1 }}>Tiếp tục với Facebook</Typography>
                </Button>

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
