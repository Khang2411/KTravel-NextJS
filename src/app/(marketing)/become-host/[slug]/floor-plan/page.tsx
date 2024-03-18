'use client'
import { FloorPlanForm } from '@/components/become-host';
import { Box, Typography } from '@mui/material';

const dataList = [
    {
        name: 'Khách',
        type: 'guests'
    }
    ,
    {
        name: 'Phòng ngủ',
        type: 'bedrooms'
    },
    {
        name: 'Giường',
        type: 'beds'
    },
    {
        name: 'Phòng tắm',
        type: 'bathrooms'
    }
]
const Page = () => {

    async function handleSubmit(payload: any) {
        console.log(payload)
    }
    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Khách sẽ được sử dụng loại chỗ ở nào?</Typography>
                </Box>
                <Box>
                    <FloorPlanForm data={dataList} onSubmit={handleSubmit}></FloorPlanForm>
                </Box>
            </Box>
        </Box>
    );
}
export default Page;