'use client'
import { Box, Button, Stack } from '@mui/material';
import { Logo, UserMenu } from '..';
import { useAuth, useRoomList } from '@/hook';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export const HeaderManage = () => {
    const { isLoggedIn, profile } = useAuth()
    const { addRoom } = useRoomList({ enable: false })
    const router = useRouter()

    const handleBecomeHost = async () => {
        if (isLoggedIn) {
            const params = {
                host_id: profile?.data.id
            }
            const room = await addRoom(params);
            router.push(`/become-host/${room.data.id}/structure`);
        }
    };
    return (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ padding: "15px", height: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
                    <Logo></Logo>
                    <Box>
                        <Button variant="text"><Link href={'/hosting/reservation'}>Đặt phòng</Link></Button>
                        <Link href='/hosting/listings'><Button variant="text"> Nhà cho thuê</Button></Link>
                        <Button variant="text" onClick={handleBecomeHost}>Tạo mục cho thuê mới</Button>
                        <Link href='/message'><Button variant="text">Tin nhắn</Button></Link>
                    </Box>
                    <UserMenu></UserMenu>
                </Stack>
            </Box>
        </Box>
    );
}


