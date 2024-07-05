'use client'
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { UserMenu } from './UserMenu';
import { usePathname, useRouter } from 'next/navigation'
import { useAuth, useRoomList } from '@/hook';
import { LoginModal, RegisterModal } from '../../modal';
import { ModalContext } from "../header/UserMenu";
import { useState } from 'react';

export const HeaderManageMobile = () => {
    const pathname = usePathname()
    const shifPathname = pathname.split('/').slice(1).shift()
    const { isLoggedIn, profile } = useAuth()
    const router = useRouter()
    const { addRoom } = useRoomList({ enable: false })
    const [openRegModal, setOpenRegModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

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

    // console.log(shifPathname)
    // console.log(pathname)
    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Link href={pathname === '/hosting/listings' && '/' || shifPathname === 'manage-your-space' && '/hosting/listings' || pathname === '/message' && '/' || shifPathname === 'message' && '/message' || shifPathname === 'book' && `/room/${pathname.split('/').slice(1).pop()}` || '/'}>
                        <Box ml={2} bgcolor={'#ebebeb'} width={'30px'} borderRadius={'50%'}>
                            <KeyboardArrowLeftIcon sx={{ fontSize: 30 }} />
                        </Box>
                    </Link>
                    <Box marginRight={'10px'}>
                        <UserMenu />
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{
                    width: '100%',
                    padding: '0 10px',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                    backgroundColor: '#ffff',
                    position: 'fixed',
                    bottom: '0',
                    zIndex: '999',

                }}>
                    <Box sx={{ padding: '15px 5px' }}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }}>
                                <Link href={'/hosting/reservation'}>
                                    <NoteAltOutlinedIcon sx={{ fontSize: 28 }} />
                                    <Typography sx={{ cursor: 'pointer' }} fontSize={'0.625rem'}>Đặt phòng</Typography>
                                </Link>
                            </Box>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }}>
                                <Link href={'/hosting/listings'}>
                                    <VillaOutlinedIcon sx={{ fontSize: 28 }} />
                                    <Typography sx={{ cursor: 'pointer' }} fontSize={'0.625rem'}>Nhà cho thuê</Typography>
                                </Link>
                            </Box>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }} onClick={handleBecomeHost}>
                                <AddHomeOutlinedIcon sx={{ fontSize: 28 }} />
                                <Typography fontSize={'0.625rem'}>Tạo mục cho thuê</Typography>
                            </Box>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }}>
                                <Link href={'/message'}>
                                    <ModeCommentOutlinedIcon sx={{ fontSize: 28 }} />
                                    <Typography fontSize={'0.625rem'}>Tin nhắn</Typography>
                                </Link>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <ModalContext.Provider value={{ openLoginModal, setOpenLoginModal, openRegModal, setOpenRegModal }}>
                <LoginModal />
                <RegisterModal />
            </ModalContext.Provider>
        </>
    )
}