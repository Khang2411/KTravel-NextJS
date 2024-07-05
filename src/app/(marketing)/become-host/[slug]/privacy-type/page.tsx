'use client'
import { PrivacyTypeForm } from '@/components/become-host';
import { usePrivacyList, useRoomList } from '@/hook';
import { Room } from '@/models';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { slug: number } }) {
    const { data: privacyList } = usePrivacyList({})
    const { updateRoom } = useRoomList({ enable: false })
    const router = useRouter()

    const handlePrivacySubmit = async (payload: { privacy_type: string | number }) => {
        const data = {
            id: params.slug,
            privacy_id: payload.privacy_type
        }

        try {
            const room = await updateRoom(data as Room)
            router.push(`/become-host/${params.slug}/amenities`);
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
                    <PrivacyTypeForm id={params.slug} data={privacyList?.data} onSubmit={handlePrivacySubmit}></PrivacyTypeForm>
                </Box>
            </Box>
        </Box>
    )
}
