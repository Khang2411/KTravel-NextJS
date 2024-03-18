import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import { PriceForm } from "../become-host";

export const Basics = () => {
    return (
        <Box id="basics" sx={{ '&>div': { paddingBlock: '24px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Thông tin cơ bản về nhà/phòng cho thuê</Typography>
            </Box>

            <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Tiêu đề nhà/phòng cho thuê</Typography>
                        <Box>fwefef</Box>
                    </Box>
                    <Box>
                        <Button variant="text">Chỉnh sửa</Button>
                    </Box>
                </Stack>
            </Box>
            <Divider />
            <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Mô tả nhà/phòng cho thuê</Typography>
                        <Box>Bạn sẽ có một khoảng thời gian tuyệt vời</Box>
                    </Box>
                    <Box>
                        <Button variant="text">Chỉnh sửa</Button>
                    </Box>
                </Stack>
            </Box>
            <Divider />
            <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Số lượng khách</Typography>
                    </Box>
                    <Box>
                        <Button variant="text">Chỉnh sửa</Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}


