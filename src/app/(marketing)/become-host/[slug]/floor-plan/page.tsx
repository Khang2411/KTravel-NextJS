'use client'
import { FloorPlanForm } from '@/components/become-host';
import { useRoomList } from '@/hook';
import { Room } from '@/models';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const dataList = [
    {
        name: 'Người lớn',
        type: 'adult'
    }
    ,
    {
        name: 'Trẻ em',
        type: 'child'
    },
    {
        name: 'Phòng ngủ',
        type: 'bedroom'
    },

    {
        name: 'Phòng tắm',
        type: 'bathroom'
    }
]

const Page = ({ params }: { params: { slug: number } }) => {
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })

    async function handleSubmit(payload: Partial<Room>) {
        console.log(payload)
        const data = {
            id: params.slug,
            adult: payload.adult,
            child: payload.child,
            bedroom: payload.bedroom,
            bathroom: payload.bathroom
        }
        
        try {
            const room = await updateRoom(data as Room)
            router.push(`/become-host/${room.data.id}/photos`);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Khách sẽ được sử dụng loại chỗ ở nào?</Typography>
                </Box>
                <Box>
                    <FloorPlanForm data={dataList} onSubmit={handleSubmit} id={params.slug} />
                </Box>
            </Box>
        </Box>
    );
}
export default Page;