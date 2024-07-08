'use client'
import { ResponsePaginate, Room } from "@/models";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { RoomCard } from "./RoomCard";
import { RoomSearchMap } from ".";
import Link from "next/link";
import { useSearchParams, usePathname } from 'next/navigation'

type RoomSearchListProps = {
    rooms: ResponsePaginate<Room>
}

export const RoomSearchList = ({ rooms }: RoomSearchListProps) => {
    const { ref, inView } = useInView({ threshold: 0 });
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [observer, setObserver] = useState(rooms.data)

    const place = searchParams.get('place')
    const checkIn = searchParams.get('check_in')
    const checkOut = searchParams.get('check_out');
    const adult = searchParams.get('adult');
    const child = searchParams.get('child');

    const fetchImages = async () => {
        if (rooms.next_page_url) {
            const response = await fetch(rooms.next_page_url + `&limit=12&place=${place}&check_in=${checkIn}&check_out=${checkOut}&adult=${adult}&child=${child}`);
            const results = await response.json();
            setObserver((prev) => [...prev, ...results.data.data])
            rooms.next_page_url = results.data.next_page_url
        }
    };

    useEffect(() => {
        setObserver(rooms.data)
        //because mutatte by search for server page api
    }, [rooms.data])

    useEffect(() => {
        inView && fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
        <Box>
            {observer.length !== 0 ? <Stack direction={{ xs: 'column-reverse', md: 'row' }} gap={3} alignItems={'center'}>
                <Grid container spacing={3} width={{ xs: '100%', md: '56%' }} >
                    {observer.map((item, index) =>
                        <Grid item xs={12} sm={6} md={pathname === "/search" ? 6 : 4} lg={pathname === "/search" ? 4 : 3} key={index}>
                            <RoomCard room={item}></RoomCard>
                            {index === observer.length - 5 && <Box ref={ref}></Box>}
                        </Grid>
                    )}
                </Grid>
                <Box width={{ xs: '100%', md: '42%' }}>
                    <Box height={{ xs: '45vh', md: '100vh' }} position={'sticky'} top={'135px'} right={0} zIndex={10}>
                        <RoomSearchMap rooms={observer} />
                    </Box>
                </Box>
            </Stack> :
                <Box>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                        <Typography variant='h5'>Không tìm thấy dữ liệu</Typography>
                        <Link href="/">Quay lại trang chủ</Link>
                    </Box>
                </Box>}
        </Box>
    )
}

