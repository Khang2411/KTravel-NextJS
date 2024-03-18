'use client'
import { Box, Typography } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { PrivacyTypeForm } from '@/components/become-host';
import { Suspense } from 'react'

const privacyType = [
    {
        'type': 'entire_home',
        'description': 'Toàn bộ nhà',
        'helper_text': 'Khách được sử dụng riêng toàn bộ chỗ ở này.',
        'icon': <HouseIcon sx={{ fontSize: 40 }} />
    },
    {
        'type': 'private_room',
        'description': 'Một căn phòng',
        'helper_text': 'Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung.',
        'icon': <MeetingRoomIcon sx={{ fontSize: 40 }} />
    },
    {
        'type': 'shared_room',
        'description': 'Phòng chung',
        'helper_text': 'Khách ngủ trong một phòng hoặc khu vực chung – nơi bạn hoặc người khác có thể cùng sử dụng.',
        'icon': <FamilyRestroomIcon sx={{ fontSize: 40 }} />
    }
]
const Page = () => {
    return (

        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Khách sẽ được sử dụng loại chỗ ở nào?</Typography>
                </Box>

                <Box>
                    <Suspense fallback={<p>Loading feed...</p>}>
                        <PrivacyTypeForm data={privacyType}></PrivacyTypeForm>
                    </Suspense>
                </Box>
            </Box>
        </Box>

    )
}

export default Page;