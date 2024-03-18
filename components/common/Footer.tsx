'use client'
import { Box, Stack } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


export const Footer = () => {
    return (
        <Box component={'section'} sx={{ backgroundColor: 'rgb(247, 247, 247)', borderTop: '1px solid rgb(221, 221, 221)' }}>
            <Stack direction={'row'} justifyContent={'space-between'} padding={'24px 80px'}>
                <Box>© 2023 NHK, DATN.</Box>
                <Box>
                    <FacebookIcon fontSize="small" />
                    <InstagramIcon fontSize="small" />
                </Box>
            </Stack>
        </Box>
    );
}


