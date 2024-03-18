import { Box, Button, Stack, Typography } from "@mui/material";

export const Amenities = () => {
    return (
        <Box id='amenities' sx={{ '&>div': { paddingBlock: '24px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Tiện nghi</Typography>
            </Box>

            <Box> 
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Stack direction={'row'} gap={8}>
                            <Box>
                                <Typography>Không gian riêng để làm việc</Typography>
                                <Typography>Không gian riêng để làm việc</Typography>
                                <Typography>Không gian riêng để làm việc</Typography>
                                <Typography>Không gian riêng để làm việc</Typography>
                            </Box>
                            <Box>
                                <Typography>Không gian riêng để làm việc</Typography>
                                <Typography>Không gian riêng để làm việc</Typography>
                                <Typography>Không gian riêng để làm việc</Typography>
                                <Typography>Không gian riêng để làm việc</Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <Button variant="text">Chỉnh sửa</Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}


