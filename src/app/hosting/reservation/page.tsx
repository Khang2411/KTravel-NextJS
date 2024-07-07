import { ReservationTab } from "@/components/reservation";
import { Box, Typography } from "@mui/material";
import { cookies } from 'next/headers';
import fetch from 'node-fetch';

const getReservationList = async () => {
      {/* @ts-ignore */}
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/list?page=1&limit=10&person=me`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
        },
    })
    return res.json();
}
const Page = async () => {
    const reservation = await getReservationList()
    return (

        <>
            <Box sx={{ maxWidth: '1440px', width: '100%', margin: 'auto' }}>
                <Box>
                    <Typography variant="h5" padding={'30px 0'}>Đặt phòng</Typography>
                </Box>
                <Box>
                   <ReservationTab reservationList={reservation.data} />
                </Box>
            </Box>
        </>
    );
}
export default Page;