'use client'
import { LoginForm } from '@/components/auth';
import { ModalLayout } from '@/components/modal';
import { Box, Button, Divider, Typography } from '@mui/material';
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { useContext } from 'react';
import { ModalContext } from '../common/header/UserMenu';
import { ModalContextRoomMobile } from '../common/header/HeaderRoomMobile';
import { decodeUrl } from '@/utils/url';

export const LoginModal = () => {
    const { openLoginModal, setOpenLoginModal } = useContext(ModalContext);
    const { openLoginMobile, setOpenLoginMobile } = useContext(ModalContextRoomMobile);
    const searchParams = useSearchParams()

    const onClick = (provider: 'google' | 'facebook') => {
        const backTo = searchParams?.get('back_to') ? decodeUrl(searchParams?.get('back_to') as string) : '/'
        signIn(provider, { callbackUrl: backTo })
    }

    const bodyContent = <LoginForm handleClose={() => { setOpenLoginModal(false), setOpenLoginMobile(false) }} />
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
                    onClick={() => { onClick('google') }}
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
            openModal={searchParams.get('back_to') ? true : openLoginModal || openLoginMobile} //openLoginModal
            handleOpen={() => { setOpenLoginModal(true), setOpenLoginMobile(true) }}
            handleClose={() => { setOpenLoginModal(false), setOpenLoginMobile(false) }}
            title='Đăng nhập'
            heading='Chào mừng đến với KTravel'
            bodyContent={bodyContent}
            footerContent={footerContent}
        />
    )
}
