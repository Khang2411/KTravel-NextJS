import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { Room } from "@/models";

type RoomInfo = {
    room: Room
}
export const RoomInfo = ({ room }: RoomInfo) => {
    return (
        <>
            <Box>
                <Box sx={{ margin: "16px 0" }}>
                    <Box sx={{ padding: '24px 0' }} className="title-room">
                        <Box marginBottom={'8px'}><Typography fontSize={26} fontWeight={600} lineHeight={'30px'}>{room?.name}</Typography></Box>
                        <Stack direction={'row'} flexWrap={'wrap'} gap={1} sx={{
                            alignItems: 'center',
                            '& span': {
                                fontWeight: '600',
                                fontSize: '14px',
                            }
                        }}>
                            <Box>
                                <Typography component={'span'}><StarIcon color="primary" fontSize='small' sx={{ verticalAlign: 'sub' }} />  5,0</Typography>
                            </Box>
                            <Box>
                                <Typography component={'span'} sx={{ textDecoration: 'underline' }} >{room?.number_of_reviews} đánh giá</Typography>
                            </Box>
                            <Box>
                                <Typography component={'span'} sx={{ textDecoration: 'underline' }}>{room?.neighbourhood}, Nhật Bản</Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box className="overview">
                        <Box sx={{ padding: '24px 0' }}>
                            <Typography fontWeight={600} fontSize={18}>Chủ sở hữu/Người quản lý</Typography>
                            <Stack direction={'row'} flexWrap={'wrap'} gap={1} sx={{
                                '& span': {
                                    fontSize: '16px',
                                    lineHeight: '26px'
                                }
                            }}>
                                <Box><Typography component={'span'}>{room?.host_name}</Typography></Box>
                            </Stack>
                        </Box>
                    </Box>
                    <Divider />

                    <Box className="amenities" sx={{ padding: '24px 0' }}>
                        <Box paddingBottom={'16px'}>
                            <Typography fontWeight={600} fontSize={22}>Nơi này có gì cho bạn</Typography>
                        </Box>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            flexWrap={{ xs: 'unset', md: 'wrap' }}
                            sx={{
                                '& p': { paddingBottom: '16px', color: '#222222' },
                                '& > div': { flexBasis: { md: '50%' }, margin: '5px 0' }
                            }}>

                            {room.amenities.map((item, index: React.Key) =>
                                <Box key={index}>
                                    <Box dangerouslySetInnerHTML={{ __html: item.icon }}/>
                                    <Typography>{item.name}</Typography>
                                </Box>)}

                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    );
}


