import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import CancelIcon from '@mui/icons-material/Cancel';

export default function OrderSuccess() {

    return (
        <Box textAlign={'center'} height={'75vh'}>
            <Box>
                <CancelIcon sx={{ fontSize: 300, color: '#FF0000' }} />
                <Box>
                    <Typography variant='h5'>Thanh toán thất bại. </Typography>
                </Box>
            </Box>
            <Box>
                <Link href={"/"} color={"#5376B1"}>Tiêp tục đặt phòng</Link>
            </Box>
        </Box>
    )
}