import { Box, Button, Stack } from '@mui/material';
import { Logo } from '..';
import UserMenu from './UserMenu';

export const HeaderManage = () => {
    return (
        <Box sx={{ padding: "15px", height: '100%' }}>
            <Stack direction="row" justifyContent="space-between">
                <Logo></Logo>
                <Box>
                    <Button variant="text">Đặt phòng</Button>
                    <Button variant="text">Nhà cho thuê</Button>
                    <Button variant="text">Tạo mục cho thuê mới</Button>
                </Box>
                <UserMenu></UserMenu>
            </Stack>
        </Box>
    );
}


