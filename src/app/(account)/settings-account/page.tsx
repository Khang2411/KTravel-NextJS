'use client'
import { AccountBasics } from "@/components/auth";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Page = () => {
    return (
        <Box sx={{ maxWidth: '1440px', paddingInline: { xs: '24px', md: '80px' } }}>
            <ToastContainer />
            <Stack direction={'row-reverse'} justifyContent={'space-between'} gap={5}>
                <Box display={{ md: 'block', xs: 'none' }} width={'28%'} mt={'24px'}>
                    <Box padding={'24px'} border={'1px solid #DDDDDD'} borderRadius={'12px'}>
                        <Box mb={2}>
                            <LockIcon fontSize="large" sx={{ color: '#5ab3eb' }} />
                            <Typography variant="h6">Tại sao thông tin của tôi không được hiển thị ở đây?</Typography>
                            <Typography color={'#6A6A6A'} fontSize={'14px'}>Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính của bạn.</Typography>
                        </Box>
                        <Divider />
                        <Box mt={2} mb={2}>
                            <KeyIcon fontSize="large" sx={{ color: '#5ab3eb' }} />
                            <Typography variant="h6">Bạn có thể chỉnh sửa những thông tin nào?</Typography>
                            <Typography color={'#6A6A6A'} fontSize={'14px'}>Bạn có thể chỉnh sửa thông tin liên hệ và thông tin cá nhân. Nếu sử dụng thông tin này để xác minh danh tính, bạn sẽ cần phải xác minh lần nữa vào lần đặt tiếp theo, hoặc để tiếp tục đón tiếp khách.</Typography>
                        </Box>
                        <Divider />
                        <Box mt={2} mb={2}>
                            <VisibilityIcon fontSize="large" sx={{ color: '#5ab3eb' }} />
                            <Typography variant="h6">Thông tin nào được chia sẻ với người khác?</Typography>
                            <Typography color={'#6A6A6A'} fontSize={'14px'}>KTravel chỉ tiết lộ thông tin liên lạc cho Chủ nhà/Người tổ chức và khách sau khi đặt phòng/đặt chỗ được xác nhận.</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box width={{ xs: '100%', md: '68%' }}>
                    <AccountBasics></AccountBasics>
                </Box>
            </Stack>
        </Box >
    )
}
export default Page;