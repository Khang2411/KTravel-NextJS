
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <Typography variant='h5'>Không có trang này</Typography>
        <Link href="/">Quay lại trang chủ</Link>
      </Box>
    </Box>
  )
}
