'use client'
import { SelfileForm } from '@/components/auth'
import { useAuth } from '@/hook'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const { verify } = useAuth()
    const router = useRouter()

    const handleSubmit = async (payload: { selfile: string }) => {
        try {
            toast.loading("Đang upload ảnh. Vui lòng đợi")
            await verify({ selfile: payload.selfile })
            router.push('/checking-verify')

        } catch (err) {
            console.log(err)
            return
        }
    }

    return (
        <>
            <ToastContainer />

            <Box marginBlockStart={'32px'}>
                <Box sx={{ maxWidth: { xs: '330px', sm: '630px' }, width: '100%', margin: 'auto' }}>
                    <Box mb={2}>
                        <Typography variant='h5' mb={1} fontWeight={500}>
                            Hãy tự chụp ảnh mình
                        </Typography>
                        <Typography variant='h6' mb={1} fontWeight={500}>
                            Lưu ý rằng máy ảnh trên thiết bị phải được cho phép
                        </Typography>
                        <Typography>
                            Hãy thử giữ thiết bị thẳng trước mặt bạn hoặc nhờ bạn bè chụp cho bạn. Đảm bảo toàn bộ khuôn mặt đều hiện trong khung hình.
                        </Typography>
                    </Box>

                    <Box>
                        <SelfileForm onSubmit={handleSubmit} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Page;