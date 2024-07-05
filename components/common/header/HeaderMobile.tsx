'use client'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { Search, UserMenu } from '..';

export const HeaderMobile = () => {
    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{paddingInline: "25px", paddingBlock: "10px", height: '100%' }}>
                    <Stack direction="row" justifyContent="center" alignItems={'center'}>
                        <Search></Search>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{
                    width: '100%',
                    padding: '0 10px',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                    backgroundColor: '#ffff',
                    position: 'fixed',
                    bottom: '0',
                    zIndex: '999',

                }}>
                    <Box sx={{ padding: '15px 5px' }}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }}>
                                <Link href={'/'}>
                                    <HomeOutlinedIcon sx={{ fontSize: 28 }} />
                                    <Typography sx={{ cursor: 'pointer' }} fontSize={'0.625rem'}>Trang chủ</Typography>
                                </Link>
                            </Box>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }}>
                                <Link href={'/wishlist'}>
                                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 28 }} />
                                    <Typography fontSize={'0.625rem'}>Yêu thích</Typography>
                                </Link>
                            </Box>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }}>
                                <Link href={'/message'}>
                                    <ModeCommentOutlinedIcon sx={{ fontSize: 28 }} />
                                    <Typography fontSize={'0.625rem'}>Tin nhắn</Typography>
                                </Link>
                            </Box>
                            <Box textAlign={'center'} color={'#7D7D7D'} sx={{ cursor: 'pointer' }}>
                                <UserMenu />
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
