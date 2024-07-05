'use client'
import { TitleForm } from "@/components/become-host";
import { useRoomList } from "@/hook";
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'

const Page = ({ params }: { params: { slug: number } }) => {
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })

    const handleSubmit = async (payload: { title: string }) => {
        console.log(payload)
        const data = {
            'id': params.slug,
            'name': payload.title
        }
        
        try {
            const room = await updateRoom(data)
            router.push(`/become-host/${params.slug}/description`);
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Bây giờ, hãy đặt tiêu đề cho chỗ ở thuộc danh mục nhà của bạn</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tiêu đề sau.
                    </Typography>
                </Box>
                <Box>
                    <TitleForm onSubmit={handleSubmit} id={params.slug} />
                </Box>
            </Box>
        </Box>
    );
}

export default Page;