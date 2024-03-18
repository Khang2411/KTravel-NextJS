import * as React from 'react';
import { Box, Divider } from '@mui/material';
import { HeaderDesktop } from './HeaderDesktop';

export default async function Header() {
    return (
        <>
            <Box component={'section'}>
                <Box sx={{ paddingInline: { md: '80px', sm: '40px', xs: '24px' } }}>
                    <HeaderDesktop></HeaderDesktop>
                </Box>
                <Divider />
            </Box>
        </>
    );
}
