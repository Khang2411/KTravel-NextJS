'use client'
import { Room } from "@/models";
import StarIcon from '@mui/icons-material/Star';
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { addDays, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

type RoomCard = {
    room: Room
}

export const RoomCard = ({ room }: RoomCard) => {
    const [state, setState] = useState({ search: '' })
    const searchParams = useSearchParams();

    function getDatesInRange(startDate: Date, endDate: Date) {
        const start = new Date(startDate);
        const end = new Date(endDate)

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }
    useEffect(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form\
        current.set("adult", '1');
        current.set("child", '0');
        const arrayDisabled = room.orders.map((i: { check_in: Date; check_out: Date; }) => getDatesInRange(i.check_in, i.check_out)) as []
        const disabled = [].concat.apply([], arrayDisabled)
        if (disabled.length > 0) {
            for (let i = 0; i < disabled.length; i++) {
                let length = Math.round((disabled[i + 1] - disabled[i]) / (1000 * 3600 * 24))
                if (length > 2) {
                    const check_in = format(new Date(addDays(disabled[i], 1) as Date), "Y/MM/dd")
                    const check_out = format(new Date(addDays(disabled[i], 3) as Date), "Y/MM/dd")
                    current.set("check_in", check_in.toString());
                    current.set("check_out", check_out.toString());
                    const search = current.toString();
                    setState({ search: search })
                    return
                }
            }
        } else {
            current.set("check_in", format(new Date(), "Y/MM/dd").toString());
            current.set("check_out", format(addDays(new Date(), 3), "Y/MM/dd").toString());
            const search = current.toString();
            setState({ search: search })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Box sx={{ position: 'relative' }}>
                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link href={`/room/${room.id}?${state.search}`} target="_blank">
                            <Image src="/images/travel.jpeg" alt={"travel-img"} fill={true} style={{ objectFit: 'cover', aspectRatio: '20/19' }} />
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/"}>
                            <Image src="/images/travel.jpeg" alt={"travel-img"} fill={true} style={{ objectFit: 'cover', aspectRatio: '20/19' }} />
                        </Link>
                    </SwiperSlide>
                </Swiper>

                <IconButton aria-label="favorite" sx={{
                    position: 'absolute',
                    color: '#ffff',
                    top: '8px',
                    right: '3px',
                    zIndex: '10',
                }}>
                    <AiOutlineHeart className="fill-white absolute" />
                    <AiFillHeart className="fill-neutral-500/70" />
                </IconButton >
                <Box sx={{ marginTop: '5px' }}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Box>
                            <Box >
                                <Typography fontWeight={600} fontSize={14}>{room?.neighbourhood}, Nhật Bản</Typography>
                            </Box>
                            <Box>
                                <Typography color='rgb(115 115 115)'>{room?.room_type}</Typography>
                            </Box>
                            <Box>
                                <Stack direction={'row'} gap={0.5}>
                                    <Typography fontWeight={600} fontSize={14}>{room?.price}</Typography>
                                    <Typography fontSize={14}>/</Typography>
                                    <Typography fontSize={14}>đêm</Typography>
                                </Stack>
                            </Box>
                        </Box>

                        <Box>
                            <Typography fontSize={'16px'}><StarIcon sx={{ fontSize: '15px' }} /> 4,5</Typography>
                        </Box>
                    </Stack>
                </Box >
            </Box>
        </Grid >
    );
}

