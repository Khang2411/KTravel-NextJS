import { Map } from "@/components/Map"
import { RoomHeroDesktop, RoomHeroMobile, RoomInfo, RoomReservation } from "@/components/room"
import { RoomReservationMobile } from "@/components/room/RoomReservationMobile"
import { Box, Stack } from "@mui/material"

const getRoomDetail = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/${id}`, { next: { revalidate: 500 } })
    return res.json();
}

export default async function Page({ params }: { params: { slug: number } }) {
    const room = await getRoomDetail(params.slug)


    return (
        <>
            <Box sx={{ paddingInline: { md: "80px", xs: "0px" }, margin: "16px 0" }}>
                <Box component={'section'} paddingInline={{ md: "80px", xs: "0px" }}>
                    <RoomHeroDesktop></RoomHeroDesktop>
                    <RoomHeroMobile></RoomHeroMobile>
                </Box>

                <Box component={'section'} paddingInline={{ md: "80px", xs: "0px" }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                        <RoomInfo room={room.data}></RoomInfo>
                        <RoomReservation room={room.data}></RoomReservation>
                        <RoomReservationMobile room={room.data}></RoomReservationMobile>
                    </Stack>
                </Box>

                <Box component={'section'} paddingInline={{ md: "80px", xs: "0px" }} margin="16px 0">
                    <Map lat={room.data?.latitude} long={room.data?.longitude} />
                </Box>
            </Box>
        </>
    )
}


