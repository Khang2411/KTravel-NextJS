import { BookCard, BookInfo } from '@/components/book';
import { Room,Response } from '@/models';
import { Box, Stack, Typography } from '@mui/material';
import fetch from 'node-fetch';


const getRoomDetail = async (id: number): Promise<Response<Room>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/${id}`)
    return res.json() as Promise<Response<Room>>;
}

export default async function Page({ params }: { params: { slug: number } }) {
    const room = await getRoomDetail(params.slug)
    return (
        <>
            <Box maxWidth={'1200px'} width={'100%'} margin={'auto'}>
                <Box component={'section'} bgcolor={'white'}>
                    <Box padding={'64px 16px'}>
                        <Typography variant={'h5'}>
                            Yêu cầu đặt phòng/đặt chỗ
                        </Typography>
                    </Box>
                </Box>

                <Box component={'section'} bgcolor={'white'}>
                    <Stack direction={{ xs: 'column-reverse', md: "row" }} justifyContent={'space-between'} gap={5}>
                        <Box width={{ xs: '100%', md: '59%' }}>
                            <Box padding={'16px'}>
                                <BookInfo room={room.data as any} roomId={params.slug}></BookInfo>
                            </Box>
                        </Box>

                        <Box width={{ xs: '100%', md: '39%' }}>
                            <BookCard room={room.data}></BookCard>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}