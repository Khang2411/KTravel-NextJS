'use client'
import { Box, Typography } from "@mui/material";
import { LocationForm } from "@/components/become-host";

const handleSubmit = (payload: any) => {
    console.log(payload)
}
const Page = () => {
    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' }, height: 'calc(100vh - 170px)', overflowY: 'auto' }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Xác nhận địa chỉ của bạn</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành công.
                    </Typography>
                </Box>
                <Box mt={4} mb={5}>
                    <Box >
                        <LocationForm onSubmit={handleSubmit}></LocationForm>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default Page;