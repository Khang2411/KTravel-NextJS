'use client'
import { useAuth, useRoomList } from '@/hook';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { LoginModal, RegisterModal } from '../../modal';

type ModalContextType = {
    openLoginModal: boolean
    setOpenLoginModal: (c: boolean) => void
    openRegModal: boolean
    setOpenRegModal: (c: boolean) => void
}

export const ModalContext = React.createContext<ModalContextType>({
    openLoginModal: false,
    setOpenLoginModal: () => { },
    openRegModal: false,
    setOpenRegModal: () => { }
})

export const UserMenu = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [openRegModal, setOpenRegModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const { isLoggedIn, profile, logout } = useAuth()
    const { addRoom } = useRoomList({ enable: false })
    const router = useRouter()
    const shifPathname = pathname.split('/').slice(1).shift()

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const signOut = async () => {
        await logout()
        setIsOpen(!isOpen)
    }

    const handleBecomeHost = async () => {
        if (isLoggedIn) {
            try {
                const params = {
                    host_id: profile?.data.id
                }
                const room = await addRoom(params);
                console.log(room);
                router.push(`/become-host/${room.data.id}/structure`);
            } catch (err) {
                console.log(err)
            }
        } else {
            setOpenLoginModal(!openLoginModal);
        }
    };

    return (
        <>
            <Stack position={'relative'} direction={'row'}>
                {pathname === '/' && <Button
                    sx={{
                        border: '1px solid transparent',
                        display: { md: 'block', xs: 'none' },
                        borderRadius: '40px',
                        "&:hover": {
                            backgroundColor: '#F7F7F7',
                        }
                    }}
                >
                    <Typography component={'span'} color={'#000'} fontWeight={400} onClick={handleBecomeHost}> Cho thuê ngay</Typography>
                </Button>}

                <Button
                    variant="outlined"
                    sx={{
                        color: '#000',
                        border: '1px solid #DDDDDD',
                        borderRadius: '40px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
                        gap: '10px !important',
                        padding: '9px',
                        "&:hover": {
                            backgroundColor: 'transparent',
                            border: '1px solid #DDDDDD',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.18)'
                        },
                    }}
                    onClick={toggleOpen}
                >
                    <DensityMediumIcon sx={{ fontSize: 18 }} />
                    {isLoggedIn
                        ? <Image style={{ borderRadius: '50%' }} alt='avatar' width={30} height={30}
                            src={`https://ui-avatars.com/api/?name=${encodeURI(profile?.data.name as string)}&background=232323&color=fff`} />
                        : <AccountCircleRoundedIcon sx={{ fontSize: 30 }} />
                    }
                </Button>

                {
                    (isLoggedIn && isOpen) && (
                        <Box sx={{
                            position: 'absolute',
                            right: 0,
                            transform: { xs: shifPathname === 'book' || shifPathname === 'verify-account' || shifPathname === 'settings-account' || shifPathname === 'checking-verify' || shifPathname === "verify-account-selfile" || shifPathname === 'hosting' || shifPathname === "message" ? 'translateY(22%) !important' : 'translateY(-100%) !important', md: 'translateY(22%) !important' },
                            padding: '8px 0',
                            backgroundColor: '#fff',
                            zIndex: '999',
                            borderRadius: '12px',
                            boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                            "& div:hover": {
                                backgroundColor: '#f7f7f7',
                            },
                            "& a": {
                                cursor: 'pointer',
                            }
                        }}>
                            <Link href='/wishlist'>
                                <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap', fontWeight: '600' }}>Danh sách yêu thích</Box>
                            </Link>
                            <Divider />
                            {profile?.data.verify_account !== 1 && <Link href='/verify-account'>
                                <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Xác thực tài khoản <ErrorOutlineOutlinedIcon sx={{ color: '#f44336' }} /></Box>
                            </Link>}
                            <Link href='/hosting/listings'>
                                <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Quản lý nhà/phòng cho thuê</Box>
                            </Link>
                            <Link href='/message'>
                                <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Tin nhắn</Box>
                            </Link>
                            <Link href='/settings-account'>
                                <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Tài khoản</Box>
                            </Link>
                            <Divider />
                            <Link href='/'>
                                <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }} onClick={() => signOut()}>Đăng xuất</Box>
                            </Link>
                        </Box>
                    )
                }

                {
                    (!isLoggedIn && isOpen) && (
                        <Box sx={{
                            position: 'absolute',
                            right: 0,
                            transform: { xs: 'translateY(-100%)', md: 'translateY(35%)' },
                            backgroundColor: '#fff',
                            zIndex: '999',
                            borderRadius: '12px',
                            boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                            "& div:hover": {
                                backgroundColor: '#f7f7f7',
                                borderRadius: '12px',
                            },
                            "& div": {
                                padding: '15px 25px',
                            },
                            "& a": {
                                cursor: 'pointer',
                            }
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

                            {/* <Divider />
                            <Link href=''>
                                <Box sx={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>Trợ giúp</Box>
                            </Link> */}
                        </Box>
                    )
                }
                <ModalContext.Provider value={{ openLoginModal, setOpenLoginModal, openRegModal, setOpenRegModal }}>
                    <LoginModal />
                    <RegisterModal />
                </ModalContext.Provider>
            </Stack >
        </>

    );
}
