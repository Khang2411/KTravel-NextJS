'use client'
import { VerifyForm } from '@/components/auth';
import { useAuth } from '@/hook';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const router = useRouter()
    const { verify } = useAuth()

    const handleSubmit = async (payload: { frontCard: { file: File }, backCard: { file: File } }) => {
        try {
            toast.loading("Đang upload ảnh. Vui lòng đợi")
            await verify({ front_card: payload.frontCard.file, back_card: payload.backCard.file })
            router.push('/verify-account-selfile')
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <>
            <ToastContainer />
            <Box marginBlockStart={'32px'}>
                <Box sx={{ maxWidth: { xs: '330px', sm: '630px' }, width: '100%', margin: 'auto' }}>
                    <Box mb={2}>
                        <Typography variant='h6' mb={1} fontWeight={500}>
                            Tải lên ảnh giấy phép lái xe của bạn
                        </Typography>
                        <Typography>
                            Đảm bảo ảnh của bạn không bị nhòe, mờ và mặt trước bằng lái xe thể hiện rõ khuôn mặt bạn.
                        </Typography>
                    </Box>

                    <Box>
                        <VerifyForm onSubmit={handleSubmit} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Page;