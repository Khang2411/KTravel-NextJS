import { Box, Typography, Stack, Button } from "@mui/material";

export const Location = () => {
    return (
        <Box id='location' sx={{ '&>div': { paddingBlock: '18px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Vị trí</Typography>
            </Box>

            <Box sx={{ '& > div': { marginBottom: '24px' } }}>
                <Box>
                    <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Địa chỉ cụ thể</Box>
                            <Box>Đỗ Tấn Phong, Phường 9 (Phú Nhuận), Phú Nhuận, Thành phố Hồ Chí Minh, Vietnam</Box>
                        </Box>
                        <Box>
                            <Button variant="text">Chỉnh sửa</Button>
                        </Box>
                    </Stack>
                </Box>

                <Box>
                    <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Chia sẻ vị trí</Box>
                            <Box>Đỗ Tấn Phong, Phường 9 (Phú Nhuận), Phú Nhuận, Thành phố Hồ Chí Minh, Vietnam</Box>
                        </Box>
                        <Box>
                            <Button variant="text">Chỉnh sửa</Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
