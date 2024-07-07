// @ts-nocheck
import { Map } from "@/components/Map"
import { RoomHeroDesktop, RoomHeroMobile, RoomInfo, RoomReservation } from "@/components/room"
import { RoomReservationMobile } from "@/components/room/RoomReservationMobile"
import { Box, Stack } from "@mui/material"
import { cookies } from "next/headers"
import type { Metadata, ResolvingMetadata } from 'next'
import fetch from 'node-fetch';

type Props = {
    params: { slug: string | number }
    searchParams: { [key: string]: string | string[] | undefined }
}

const getRoomDetail = async (id: number | string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/${id}`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
        },
    })
    return res.json();
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.slug
    // fetch data
    const room = await getRoomDetail(id)
    return {
        title: room.data.name,
        description: room.data.name + ' Nơi ở mới với đầy đủ tiện nghi. XEM NGAY!',
        openGraph: {
            title: room.data.name,
            description: room.data.name + ' Đặt phòng, nhà cửa khi đi du lịch với đầy đủ tiện nghi. XEM NGAY!',
        },
    }
}

export default async function Page({ params }: { params: { slug: number } }) {
    const room = await getRoomDetail(params.slug)
    return (
        <Box>
            
            <Box maxWidth={'1200px'} width={'100%'} margin={'auto'}>
                <Box component={'section'}>
                    <RoomHeroDesktop room={room.data}></RoomHeroDesktop>
                    <RoomHeroMobile room={room.data}></RoomHeroMobile>
                </Box>

                <Box component={'section'}>
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                        <RoomInfo room={room.data}></RoomInfo>
                        <RoomReservation room={room.data}></RoomReservation>
                        <RoomReservationMobile room={room.data}></RoomReservationMobile>
                    </Stack>
                </Box>

                <Box component={'section'} margin="16px 0">
                    <Box sx={{ height: { xs: '25vh', sm: '50vh' } }}>
                        <Map lat={room.data?.latitude} long={room.data?.longitude} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


