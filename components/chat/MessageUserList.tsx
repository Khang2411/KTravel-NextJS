'use client'
import { Message, ResponsePaginate } from '@/models'
import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import React, { Key, Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hook'
import { useInView } from 'react-intersection-observer';

type MessageUserListProps = {
    userList: ResponsePaginate<Message>,
}

export const MessageUserList = ({ userList }: MessageUserListProps) => {
    const router = useRouter()
    const { profile } = useAuth()
    const [observerUser, setObserver] = useState(userList.data);
    const { ref, inView } = useInView({ threshold: 0 });

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const fetchObserverMessage = async () => {
        if (userList.next_page_url) {
            const response = await fetch(userList.next_page_url + `&limit=12`, { next: { revalidate: 500 } });
            const results = await response.json();
            console.log(results);
            setObserver((prev: any) => [...prev, ...results.data.data]);
            userList.next_page_url = results.data.next_page_url
        }
    };

    useEffect(() => {
        inView && fetchObserverMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    useEffect(() => {
        if (matches === true) {
            router.push(`/message/${observerUser[0].id}`)
        }
    }, [matches, router])

    const handleUser = (id: string | number): void => {
        router.push(`/message/${id}`)
    }

    return (
        <>
            <Box>
                <List>
                    {observerUser.map((userMess, index: Key) =>
                        <ListItem key={index} button onClick={() => handleUser(userMess.id)}
                            sx={{ position: 'relative' }}>
                            {profile?.data.id !== userMess.user_from.id ?
                                <Box>
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
                                        <Box position={'relative'} width={64} height={60}>
                                            <Image src={userMess.listing.images[0].image} fill alt='room-img' style={{ borderRadius: '10px' }} />
                                        </Box>
                                        <Box>
                                            <Typography fontSize={14}>{userMess.user_from.name.length > 30 ? userMess.user_from.name.substring(0, 30) + "..." : userMess.user_from.name}</Typography>

                                            <ListItemText secondary="Nhấn vào để truy cập đoạn hội thoại..."></ListItemText>
                                        </Box>
                                    </Stack>

                                    <ListItemIcon sx={{ position: 'absolute', left: '50px', bottom: '0' }}>
                                        <Avatar alt="avatar-img" src={`https://ui-avatars.com/api/?name=${encodeURI(userMess.user_from.name)}&background=232323&color=fff`} />
                                    </ListItemIcon>
                                    {index === observerUser.length - 5 && <Box ref={ref}></Box>}
                                </Box> :
                                <Box>
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
                                        <Box position={'relative'} width={64} height={60}>
                                            <Image src={userMess.listing.images[0].image} fill alt='room-img' style={{ borderRadius: '10px' }} />
                                        </Box>
                                        <Box>
                                            <Typography fontSize={14}>{userMess.user_to.name.length > 30 ? userMess.user_to.name.substring(0, 30) + "..." : userMess.user_to.name}</Typography>

                                            <ListItemText secondary="Nhấn vào để truy cập đoạn hội thoại..."></ListItemText>
                                        </Box>
                                    </Stack>

                                    <ListItemIcon sx={{ position: 'absolute', left: '50px', bottom: '0' }}>
                                        <Avatar alt="avatar-img" src={`https://ui-avatars.com/api/?name=${encodeURI(userMess.user_to.name)}&background=232323&color=fff`} />
                                    </ListItemIcon>
                                    {index === observerUser.length - 5 && <Box ref={ref}></Box>}
                                </Box>}

                        </ListItem>
                    )}
                </List>
            </Box>
        </>
    )
}