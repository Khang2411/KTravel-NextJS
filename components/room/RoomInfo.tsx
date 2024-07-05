'use client'
import { Room } from "@/models";
import StarIcon from '@mui/icons-material/Star';
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import Link from "next/link";
import { useState } from "react";
import { ModalContext } from "../common";
import { LoginModal } from "../modal";
import { useAuth } from "@/hook";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RoomInfoProps = {
    room: Room
}

export const RoomInfo = ({ room }: RoomInfoProps) => {
    const router = useRouter()
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegModal, setOpenRegModal] = useState(false);
    const { isLoggedIn, profile } = useAuth()
    
    const handleMessage = async (roomId: string | number, roomHost: string | number) => {
        if (isLoggedIn) {
            try {
                if (profile?.data.id !== room.user.id) {
                    const addMess = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                        },
                        body: JSON.stringify({ room_id: roomId, room_host_id: roomHost }), // body data type must match "Content-Type" header

                    })
                    const addMessResponse = await addMess.json()
                    router.push(`/message/${addMessResponse.data.id}`)
                } else {
                    toast.info('Bạn là chủ phòng/căn hộ này')
                }

            } catch (err) {
                console.log(err)
            }
        } else {
            setOpenLoginModal(!openLoginModal)
        }
    }

    return (
        <>
            <ToastContainer />
            <Box>
                <Box sx={{ margin: "12px 10px" }}>
                    <Box sx={{ padding: '20px 0' }} className="title-room">
                        <Box marginBottom={'8px'}><Typography fontSize={26} fontWeight={600} lineHeight={'30px'}>{room?.name}</Typography></Box>
                        <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'space-between'} alignItems={'center'} sx={{
                            '& span': {
                                fontWeight: '600',
                                fontSize: '14px',
                            }
                        }}>
                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                <Box>
                                    <Typography component={'span'}><StarIcon color="primary" fontSize='small' sx={{ verticalAlign: 'sub' }} />  5,0</Typography>
                                </Box>
                                <Box>
                                    <Typography component={'span'} sx={{ textDecoration: 'underline' }} >{room?.number_of_reviews} đánh giá</Typography>
                                </Box>
                                <Box>
                                    <Typography component={'span'} sx={{ textDecoration: 'underline' }}>{room?.neighbourhood}, Nhật Bản</Typography>
                                </Box>
                            </Stack>
                            <Box>
                                <Box onClick={() => handleMessage(room?.id, room?.user.id)} sx={{ cursor: 'pointer' }}>
                                    <IconButton aria-label="message" color="primary">
                                        <MessageIcon />
                                    </IconButton>
                                    <Typography component={'span'} sx={{ textDecoration: 'underline' }}>Nhắn tin</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box className="overview">
                        <Box sx={{ padding: '24px 0' }}>
                            <Typography fontWeight={600} fontSize={18}>Chủ sở hữu/Người quản lý</Typography>
                            <Stack direction={'row'} flexWrap={'wrap'} gap={1} sx={{
                                '& span': {
                                    fontSize: '16px',
                                    lineHeight: '26px'
                                }
                            }}>
                                <Box><Typography component={'span'}>{room?.host_name}</Typography></Box>
                            </Stack>
                        </Box>
                    </Box>
                    <Divider />

                    <Box className="amenities" sx={{ padding: '24px 0' }}>
                        <Box paddingBottom={'16px'}>
                            <Typography fontWeight={600} fontSize={22}>Nơi này có gì cho bạn</Typography>
                        </Box>
                        <Stack
                            direction='row'
                            flexWrap='wrap'
                            sx={{
                                '& p': { paddingBottom: '16px', color: '#222222' },
                                '& > div': { flexBasis: { xs: '50%' }, margin: '5px 0' }
                            }}>

                            {room.amenities.map((item, index: React.Key) =>
                                <Box key={index}>
                                    <Box dangerouslySetInnerHTML={{ __html: item.icon }} />
                                    <Typography>{item.name}</Typography>
                                </Box>)}

                        </Stack>
                    </Box>
                </Box>
            </Box>
            <ModalContext.Provider value={{ openLoginModal, setOpenLoginModal, openRegModal, setOpenRegModal }}>
                <LoginModal />
            </ModalContext.Provider>
        </>
    );
}


