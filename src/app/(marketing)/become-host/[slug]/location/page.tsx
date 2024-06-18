'use client'
import { Box, Typography } from "@mui/material";
import { LocationForm } from "@/components/become-host";
import { useRouter } from 'next/navigation'
import { useRoomList } from "@/hook";
import { Room } from "@/models";


const Page = ({ params }: { params: { slug: number } }) => {
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })

    const handleSubmit = async (payload: Partial<Room>) => {
        console.log(payload)
        const data = {
            id: params.slug,
            latitude: payload.latitude,
            longitude: payload.longitude
        }

        try {
            const room = await updateRoom(data)
            router.push(`/become-host/${params.slug}/address`);
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' }, height: 'calc(100vh - 170px)', overflowY: 'auto' }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Xác nhận vị trí phòng của bạn</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Vị trí của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành công.
                    </Typography>
                </Box>
                <Box mt={4} mb={5}>
                    <Box >
                        <LocationForm id={params.slug} onSubmit={handleSubmit}></LocationForm>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default Page;