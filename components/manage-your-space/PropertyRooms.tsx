import { Box, Typography, Stack, Button } from "@mui/material";

export const PropertyRooms = () => {
    return (
        <Box id='property-rooms' sx={{ '&>div': { paddingBlock: '18px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Chỗ ở và phòng</Typography>
            </Box>

            <Box sx={{ '& > div': { marginBottom: '24px' } }}>
                <Box>
                    <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Loại chỗ ở</Box>
                            <Box>Nhà</Box>
                            <Box>Loại hình cho thuê: Toàn bộ nhà/căn hộ</Box>
                        </Box>
                        <Box>
                            <Button variant="text">Chỉnh sửa</Button>
                        </Box>
                    </Stack>
                </Box>

                <Box>
                    <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Phòng</Box>
                            <Box>Phòng khách: 1</Box>
                            <Box>Phòng ngủ: 1</Box>
                            <Box>Giường: 1</Box>
                            <Box>Phòng tắm: 1</Box>
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


