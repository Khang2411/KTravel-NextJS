import { BookCard, BookInfo } from '@/components/book';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Box, IconButton, Stack, Typography } from '@mui/material';

const getRoomDetail = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/${id}`, { next: { revalidate: 500 } })
    return res.json();
}

export default async function Page({ params }: { params: { slug: number } }) {
    const room = await getRoomDetail(params.slug)
    return (
        <>
            <Box component={'section'} bgcolor={'white'}>
                <Stack direction="row" paddingBlock={'64px 32px'} paddingInline={'40px'}>
                    <Box>
                        <IconButton aria-label="add before icon" size="large">
                            <NavigateBeforeIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography variant={'h4'}>
                            Yêu cầu đặt phòng/đặt chỗ
                        </Typography>
                    </Box>
                </Stack>

            </Box>
            <Box component={'section'} paddingInline={'85px'} bgcolor={'white'}>
                <Stack direction={'row'} justifyContent={'space-between'} gap={5}>
                    <Box width={'59%'}>
                        <BookInfo room={room.data}></BookInfo>
                    </Box>

                    <Box width={'39%'}>
                        <BookCard room={room.data}></BookCard>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}