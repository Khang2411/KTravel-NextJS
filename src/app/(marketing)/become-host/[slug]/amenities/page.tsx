'use client'
import { AmenityForm } from '@/components/become-host';
import { useAmenitiesList, useRoomList } from '@/hook';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { slug: number } }) {
    const { data: amenityList } = useAmenitiesList({})
    const { updateRoom } = useRoomList({ enable: false })
    const router = useRouter()

    const handleSubmit = async (payload: { amenities: [] }) => {
        console.log(payload)
        const data = {
            id: params.slug,
            amenities: payload.amenities
        }
        try {
            const room = await updateRoom(data)
            router.push(`/become-host/${params.slug}/location`);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Cho khách biết chỗ ở của bạn có những gì</Typography>
                    <Typography fontSize={18} color={'#717171'}>Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê.</Typography>
                </Box>
                <Box>
                    <AmenityForm id={params.slug} amenities={amenityList} onSubmit={handleSubmit} />
                </Box>
            </Box>
        </Box>
    );
}
