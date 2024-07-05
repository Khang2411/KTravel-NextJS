"use client"
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Divider, Fab, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../form/InputField';
import Pusher from 'pusher-js';
import { Key, use, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hook';
import { Message, ResponsePaginate, Room } from '@/models';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { format, differenceInMinutes } from "date-fns";
import { useInView } from 'react-intersection-observer';
import viLocale from "date-fns/locale/vi";

type ChatProps = {
    userList: ResponsePaginate<Message>,
    messId: number | string
    message: Message
}

type Messages = {
    user_id: string | number;
    user_name: string,
    avatar: string,
    message_time: string,
    message: string;
};

const schema = yup.object({
    message: yup.string().required(''),
}).required();


export const Chat = ({ userList, messId, message }: ChatProps) => {
    const [messages, setMessages] = useState<Array<Messages>>([]);
    const { profile } = useAuth()
    const refUser = useRef<null | HTMLElement>(null)
    const listRef = useRef<HTMLUListElement>(null);
    const router = useRouter()

    const [observerUserList, setObserverUserList] = useState(userList.data);
    const { ref, inView } = useInView({ threshold: 0 });

    useEffect(() => {
        message.message_contents.map((message: { user_id: string; user: { name: string, avatar: string }; content: string; updated_at: string }, index: Key) =>
            setMessages((prev) => [...prev, {
                user_id: message.user_id,
                user_name: message.user.name,
                avatar: message.user.avatar,
                message: message.content,
                message_time: message.updated_at ? message.updated_at : format(new Date(), "Y-MM-dd HH:mm:ss")
            }])
        )
        console.log(message)
        return () => { setMessages([]) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messId]);

    useEffect(() => {
        const pusher = new Pusher('3bf6e6d44f6aeb2fadfe', {
            cluster: 'ap1',
        });

        pusher.subscribe(`${messId}`);

        // receive 
        pusher.bind('my-event', function (data: any) {
            setMessages((prev) => [...prev, { user_id: data.user_id, user_name: data.user_name, avatar: data.avatar, message: data.message, message_time: format(new Date(), "Y-MM-dd HH:mm:ss") }]);
        });
        return () => {
            pusher.unsubscribe(`${messId}`);
        };

    }, [messId])

    useEffect(() => {
        inView && fetchObserverUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView()
    }, [messages])

    useEffect(() => {
        refUser.current?.scrollIntoView({ behavior: "smooth" });
    }, [])

    const fetchObserverUser = async () => {
        console.log(userList.next_page_url)
        if (userList.next_page_url) {
            const response = await fetch(userList.next_page_url + `&limit=12`, { next: { revalidate: 500 } });
            const results = await response.json();
            console.log(results);
            setObserverUserList((prev: any) => [...prev, ...results.data.data]);
            userList.next_page_url = results.data.next_page_url
        }
    };

    const { handleSubmit, control, reset, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            message: "",
        }
    });

    const handleUser = (messageId: string | number) => {
        router.push(`/message/${messageId}`)
    }

    const handleMessageSubmit = async (payload: { message: string }) => {
        const data = {
            user_id: profile?.data.id,
            user_name: profile?.data.name,
            avatar: profile?.data.avatar,
            message_id: messId,
            message: payload.message,
            channel: messId
        }
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/broadcast`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            reset({ message: '' });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Box>
                <Grid container paddingBlock={'15px'} boxShadow={{ xs: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;', md: 'initial' }} borderRadius={'4px'}>
                    <Grid item xs={12} display={{ xs: 'none', md: 'block' }}>
                        <Typography variant="h5" className="header-message">Message</Typography>
                    </Grid>

                    <Grid item xs={12} display={{ xs: 'block', md: 'none' }}>
                        {(profile?.data.id !== message.user_from.id) && <Avatar alt="avatar-img"
                            src={!message.user_from.avatar ? `https://ui-avatars.com/api/?name=${encodeURI(message.user_from.name)}&background=232323&color=fff` : message.user_from.avatar}
                            sx={{ width: 30, height: 30, margin: 'auto' }}
                        />}

                        {(profile?.data.id === message.user_from.id) && <Avatar alt="avatar-img"
                            src={!message.user_to.avatar ? `https://ui-avatars.com/api/?name=${encodeURI(message.user_to.name)}&background=232323&color=fff` : message.user_to.avatar}
                            sx={{ width: 30, height: 30, margin: 'auto' }}
                        />}

                    </Grid>

                    <Grid item xs={12} margin={'auto'} display={{ xs: 'block', md: 'none' }}>
                        <Typography fontSize={'14px'} textAlign={'center'}>
                            {profile?.data.id !== message.user_from.id ? message.user_from.name : message.user_to.name}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Grid container component={Paper} width={'100%'} height={'65vh'} boxShadow={'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;'} margin={'auto'}>
                <Grid item xs={3} borderRight={'1px solid #e0e0e0'} sx={{ overflowY: 'auto', display: { xs: 'none', md: 'block' } }}>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        {observerUserList.map((userMess, index: Key) =>
                            <ListItem key={index} button onClick={() => handleUser(userMess.id)} ref={messId == userMess.id ? refUser : null as any}
                                sx={{ position: 'relative', background: messId == userMess.id ? '#e5e5e5' : 'initial' }}>
                                {profile?.data.id !== message.user_from.id ?
                                    <Box>
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
                                            <Box position={'relative'} width={74} height={60}>
                                                <Image src={userMess.listing.images[0].image} fill alt='room-img' style={{ borderRadius: '10px' }} />
                                            </Box>
                                            <Typography fontSize={14}>{message.user_from.name.length > 30 ? message.user_from.name.substring(0, 30) + "..." : message.user_from.name}</Typography>
                                            <ListItemText secondary="Khách" sx={{ textAlign: 'right', '& p': { fontSize: '12px' } }}></ListItemText>
                                        </Stack>

                                        <ListItemIcon sx={{ position: 'absolute', left: '50px', bottom: '0' }}>
                                            <Avatar alt="avatar-img" src={!message.user_from.avatar ? `https://ui-avatars.com/api/?name=${encodeURI(message.user_from.name)}&background=232323&color=fff` : message.user_from.avatar} />
                                        </ListItemIcon>
                                        {index === observerUserList.length - 5 && <Box ref={ref}></Box>}
                                    </Box> :
                                    <Box>
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
                                            <Box position={'relative'} width={74} height={60}>
                                                <Image src={userMess.listing.images[0].image} fill alt='room-img' style={{ borderRadius: '10px' }} />
                                            </Box>
                                            <Typography fontSize={14}>{userMess.user_to.name.length > 30 ? userMess.user_to.name.substring(0, 30) + "..." : userMess.user_to.name}</Typography>
                                        </Stack>

                                        <ListItemIcon sx={{ position: 'absolute', left: '50px', bottom: '0' }}>
                                            <Avatar alt="avatar-img" src={!message.user_to.avatar ? `https://ui-avatars.com/api/?name=${encodeURI(userMess.user_to.name)}&background=232323&color=fff` : message.user_to.avatar} />
                                        </ListItemIcon>
                                        {index === observerUserList.length - 5 && <Box ref={ref}></Box>}
                                    </Box>}
                            </ListItem>
                        )}
                    </List>
                </Grid>
                <Grid item xs={12} md={9} position={'relative'}>
                    <List sx={{ height: '50vh', overflowY: 'auto' }} ref={listRef} className='list-message'>
                        {messages.map((message, index: Key) =>
                            profile?.data.id === message.user_id ?
                                <ListItem key={index}>
                                    <Grid container>
                                        {index !== 0
                                            && (message.user_id === messages[index as number - 1].user_id)
                                            && (new Date(message.message_time).toDateString() === new Date(messages[index as number - 1].message_time).toDateString())
                                            && (differenceInMinutes(new Date(message.message_time), new Date(messages[index as number - 1].message_time)) < 5)
                                            ? "" : <Grid item xs={12}>
                                                <ListItemText sx={{ textAlign: 'center', fontSize: '12px', margin: '15px 0' }}
                                                    secondary={new Date(message.message_time).toDateString() === new Date(messages[index !== 0 ? index as number - 1 : 0].message_time).toDateString() ? format(new Date(message.message_time), "dd MMMM, Y HH:mm", { locale: viLocale }) : format(new Date(message.message_time), "HH:mm")}>
                                                </ListItemText>
                                            </Grid>}
                                        <Grid item xs={12}>
                                            <Stack direction={'row'} justifyContent={'flex-end'} gap={'10px'} alignItems={'center'}>
                                                {index !== 0
                                                    && (message.user_id === messages[index as number - 1].user_id)
                                                    && (new Date(message.message_time).toDateString() === new Date(messages[index as number - 1].message_time).toDateString())
                                                    && (differenceInMinutes(new Date(message.message_time), new Date(messages[index as number - 1].message_time)) < 5)
                                                    ? "" : <Avatar alt="avatar-img"
                                                        src={!message.avatar ? `https://ui-avatars.com/api/?name=${encodeURI(message.user_name)}&background=232323&color=fff` : message.avatar}
                                                        sx={{ width: 30, height: 30 }}
                                                    />}

                                                <ListItemText sx={{
                                                    maxWidth: { xs: '230px', md: '480px' },
                                                    flex: 'initial',
                                                    float: 'right',
                                                    backgroundColor: '#3f3f3f',
                                                    color: '#ffff',
                                                    padding: '10px',
                                                    borderRadius: '12px',
                                                }} primary={message.message}></ListItemText>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </ListItem> :
                                <ListItem key={index}>
                                    <Grid container alignItems={'center'}>
                                        {index !== 0
                                            && (message.user_id === messages[index as number - 1].user_id)
                                            && (new Date(message.message_time).toDateString() === new Date(messages[index as number - 1].message_time).toDateString())
                                            && (differenceInMinutes(new Date(message.message_time), new Date(messages[index as number - 1].message_time)) < 5)
                                            ? "" : <Grid item xs={12}>
                                                <ListItemText sx={{ textAlign: 'center', fontSize: '12px', margin: '15px 0' }}
                                                    secondary={new Date(message.message_time).toDateString() === new Date(messages[index !== 0 ? index as number - 1 : 0].message_time).toDateString() ? format(new Date(message.message_time), "dd MMMM, Y HH:mm", { locale: viLocale }) : format(new Date(message.message_time), "HH:mm")}>
                                                </ListItemText>
                                            </Grid>}


                                        <Grid item xs={0.7}>
                                            {index !== 0
                                                && (message.user_id === messages[index as number - 1].user_id)
                                                && (new Date(message.message_time).toDateString() === new Date(messages[index as number - 1].message_time).toDateString())
                                                && (differenceInMinutes(new Date(message.message_time), new Date(messages[index as number - 1].message_time)) < 5)
                                                ? "" : <Avatar alt="avatar-img"
                                                    src={!message.avatar ? `https://ui-avatars.com/api/?name=${encodeURI(message.user_name)}&background=232323&color=fff` : message.avatar}
                                                    sx={{ width: 30, height: 30 }}
                                                />}
                                        </Grid>
                                        <Grid item xs={11.3}>
                                            <ListItemText sx={{
                                                maxWidth: { xs: '230px', md: '480px' },
                                                flex: 'initial',
                                                float: 'left',
                                                backgroundColor: '#f7f7f7',
                                                padding: '10px',
                                                borderRadius: '12px',
                                            }} primary={message.message}></ListItemText>
                                        </Grid>

                                    </Grid>

                                </ListItem>
                        )}
                    </List>

                    <Box component='form' onSubmit={handleSubmit(handleMessageSubmit)} position={'absolute'} bottom={0} width={'100%'}>
                        <Grid container style={{ padding: '15px' }} gap={2}>
                            <Grid item xs={12}>
                                <InputField control={control} name="message" label='Lời nhắn' helperText='' error={false} />
                                <IconButton disabled={isSubmitting} aria-label="submit" type='submit' size="small" sx={{ position: 'absolute', right: '15px', top: '25px' }} color="primary">
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </>
    );
}
