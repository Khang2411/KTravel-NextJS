'use client'
import { VerifyForm } from '@/components/auth';
import { Box, Button, Divider, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Link from 'next/link';

const Page = () => {
    return (
        <>
            <ToastContainer />
            <Box>
                <Box sx={{ maxWidth: { xs: '330px', sm: '630px' }, width: '100%', margin: '32px auto' }}>
                    <Box mt={2} mb={2}><AccessTimeOutlinedIcon fontSize='large' /></Box>
                    <Box mb={5}>
                        <Typography variant='h5' mb={1} fontWeight={500}>
                            Chúng tôi đang kiểm tra giấy tờ tùy thân của bạn
                        </Typography>
                        <Typography mb={2}>
                            Cảm ơn bạn đã hoàn tất bước quan trọng này. Chúng tôi sẽ sớm thông báo cho bạn nếu cần thêm thông tin.
                        </Typography>
                        <Typography>
                            Trong lúc chờ đợi, bạn có thể tiếp tục việc đang làm.
                        </Typography>
                    </Box>

                    <Divider />

                    <Box textAlign={'center'}>
                        <Link href={'/'}>
                            <Button type="button"
                                variant="contained"
                                sx={{
                                    marginTop: '20px',
                                    backgroundColor: '#222222 !important',
                                    width: '30%',
                                    borderRadius: '8px'
                                }}>
                                Tiếp tục
                            </Button>
                        </Link>

                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Page;