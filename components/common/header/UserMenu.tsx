'use client'
import { Box, Button, Divider, Stack } from '@mui/material';
import * as React from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { LoginModal, RegisterModal } from '../../modal';
import { useAuth } from '@/hook';

export type ModalContextType = {
    openLoginModal: boolean
    setOpenLoginModal: (c: boolean) => void
    openRegModal: boolean
    setOpenRegModal: (c: boolean) => void
}
const ModalContext = React.createContext<ModalContextType>({
    openLoginModal: false,
    setOpenLoginModal: () => { },
    openRegModal: false,
    setOpenRegModal: () => { }
})

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [openRegModal, setOpenRegModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const { isLoggedIn, profile, logout } = useAuth()

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const signOut = async () => {
        await logout()
        setIsOpen(!isOpen)
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Button
                sx={{
                    border: '1px solid transparent',
                    borderRadius: '40px',
                    gap: '5px',
                    "&:hover": {
                        backgroundColor: '#F7F7F7',
                    },
                }}
            >
                <Box sx={{ color: '#000', fontWeight: '400' }}><span>Đón tiếp khách </span></Box>
            </Button>

            <Button
                variant="outlined"
                sx={{
                    color: '#000',
                    border: '1px solid #DDDDDD',
                    borderRadius: '40px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
                    gap: '5px',
                    padding: '12px',
                    "&:hover": {
                        backgroundColor: 'transparent',
                        border: '1px solid #DDDDDD',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.18)'
                    },
                }}
                onClick={toggleOpen}
            >
                <DensityMediumIcon sx={{ fontSize: 18 }} />
                <Image alt='avatar' width={30} height={30} src='/next.svg' />
            </Button>

            {(isLoggedIn && isOpen) && (
                <Box sx={{
                    position: 'absolute',
                    right: 0,
                    padding: '8px 0',
                    backgroundColor: '#fff',
                    zIndex: '999',
                    borderRadius: '12px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                    "& div:hover": {
                        backgroundColor: '#f7f7f7',
                    },
                }}>
                    <Link href='/'>
                        <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap', fontWeight: '600' }}>Danh sách yêu thích </Box>
                    </Link>
                    <Divider />

                    <Link href='/'>
                        <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap', fontWeight: '600' }}>Thông báo</Box>
                    </Link>

                    <Divider />
                    <Link href='/'>
                        <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Quản lý nhà/phòng cho thuê</Box>
                    </Link>
                    <Link href='/'>
                        <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Tài khoản</Box>
                    </Link>
                    <Divider />
                    <Link href='/'>
                        <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }} onClick={() => signOut()}>Đăng xuất</Box>
                    </Link>
                </Box>
            )}

            {(!isLoggedIn && isOpen) && (
                <Box sx={{
                    position: 'absolute',
                    right: 0,
                    padding: '8px 0',
                    backgroundColor: '#fff',
                    zIndex: '999',
                    borderRadius: '12px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                    "& div:hover": {
                        backgroundColor: '#f7f7f7',
                    },
                }}>
                    <Link href={''}>
                        <Box
                            sx={{ padding: '12px 16px', whiteSpace: 'nowrap', fontWeight: '600' }}
                            onClick={() => { setOpenLoginModal(!openLoginModal), setIsOpen(!isOpen) }}>
                            Đăng nhập
                        </Box>
                    </Link>
                    <Link href=''>
                        <Box
                            sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}
                            onClick={() => { setOpenRegModal(!openRegModal), setIsOpen(!isOpen) }}>
                            Đăng ký
                        </Box>
                    </Link>

                    <Divider />
                    <Link href=''>
                        <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Cho thuê chỗ ở qua Airbnb</Box>
                    </Link>
                    <Link href=''>
                        <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Trợ giúp</Box>
                    </Link>

                </Box>
            )}
            <ModalContext.Provider value={{ openLoginModal, setOpenLoginModal, openRegModal, setOpenRegModal }}>
                <LoginModal />
                <RegisterModal />
            </ModalContext.Provider>
        </Box>
    );
}
export const useModalContext = () => useContext(ModalContext);
