'use client'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

export default function Serach() {
    return (
        <Button
            variant="outlined"
            sx={{
                border: '1px solid #DDDDDD',
                borderRadius: '40px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
                gap: '5px',
                "&:hover": {
                    backgroundColor: 'transparent',
                    border: '1px solid #DDDDDD',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.18)'
                },
                "&>div": {
                    padding: '0 16px'
                },
            }}
        >
            <Box sx={{ color: '#717171' }}><Typography>Địa điểm bất kỳ </Typography></Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ color: '#717171' }}><Typography>Tuần bất kỳ </Typography></Box>
            <Divider orientation="vertical" flexItem />
            <Stack sx={{ color: '#717171' }} direction={'row'} gap={5} alignItems={'center'}>
                <Box><Typography>Thêm khách</Typography></Box>

                <SearchIcon sx={{
                    fontSize: 18,
                    backgroundColor: '#ff385c',
                    color: '#fff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    padding: '7px'
                }} />
            </Stack>
        </Button>
    );
}
