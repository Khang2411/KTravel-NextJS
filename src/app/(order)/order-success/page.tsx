import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import DoneIcon from '@mui/icons-material/Done';

export default function OrderSuccess() {

    return (
        <Box textAlign={'center'} height={'75vh'}>
         <Box>
                <DoneIcon sx={{ fontSize: 300 }} color='success' />
                <Box>
                    <Typography variant='h5'>Cảm ơn bạn vì đã đặt phòng. </Typography>
                </Box>
            </Box> 
            <Box>
                <Link href={"/"} color={"#5376B1"}>Tiêp tục đặt phòng</Link>
            </Box>
        </Box>
    )
}