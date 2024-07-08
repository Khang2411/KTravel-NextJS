import { HostingList } from "@/components/hosting";
import { Box, Typography } from "@mui/material";
import { cookies } from 'next/headers'


const getRoomList = async (): Promise<any> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/rooms?page=1&limit=12`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
        },
    })
    return res.json();
}

const Page = async () => {
    const rooms = await getRoomList()
    return (
        <>
            <Box sx={{ maxWidth: '1440px', width: '100%', margin: 'auto' }}>
                <Box>
                    <Typography variant="h5" padding={'30px 0'}>Nhà/phòng cho thuê của bạn</Typography>
                </Box>
                <Box>
                    {rooms.data.total === 0 ? <Typography align="center" mt={5}>Không có dữ liệu</Typography> : <HostingList rooms={rooms.data} />}
                </Box>
            </Box>
        </>
    );
}
export default Page;