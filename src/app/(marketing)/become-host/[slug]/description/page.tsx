'use client'
import { DescriptionForm } from "@/components/become-host";
import { useRoomList } from "@/hook";
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { slug: number } }) => {
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })

    const handleSubmit = async (payload: { description: string }) => {
        console.log(payload)
        const data = {
            id: params.slug,
            description: payload.description
        }
        try {
            const room = await updateRoom(data)
            router.push(`/become-host/${params.slug}/price`);
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' }, height:'100vh' }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Tạo phần mô tả</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Chia sẻ những điều tạo nên nét đặc biệt cho chỗ ở của bạn.
                    </Typography>
                </Box>
                <Box>
                    <DescriptionForm onSubmit={handleSubmit} id={params.slug} />
                </Box>
            </Box>
        </Box>
    );
}
export default Page;