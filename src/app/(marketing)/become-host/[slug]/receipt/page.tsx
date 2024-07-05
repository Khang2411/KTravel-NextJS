'use client'
import { FooterBecomeHost } from "@/components/become-host";
import mutateBecomeHost from "@/components/become-host/mutateBecomeHost";
import { useAuth, useRoomDetails, useRoomList } from "@/hook";
import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { slug: number } }) => {
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })
    const { data: room } = useRoomDetails({ params: params.slug })
    const { profile } = useAuth({})

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const data = {
            id: params.slug,
            status: 'confirm',
            host_name: profile?.data.name
        }

        try {
            const room = await updateRoom(data)
            mutateBecomeHost()
            router.push(`/hosting/listings`);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Xem lại mục cho thuê của bạn</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Dưới đây là những thông tin mà chúng tôi sẽ hiển thị cho khách. Hãy đảm bảo mọi thứ đều ổn thỏa.
                    </Typography>
                </Box>
                <Box component='form' onSubmit={(handleSubmit)}>
                    <Box height={'100vh'}>
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} gap={5} alignItems={'center'}>
                            <Card sx={{ maxWidth: 345, width: 345, padding: '10px', borderRadius: '8px' }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={room?.data.images[0].image}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom>
                                        {room?.data.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                        {room?.data.price}$/đêm
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Box>
                                <Box mb={2}>
                                    <Typography fontSize={'1.125rem'} lineHeight={'2.375rem'} color="#717171" fontWeight={600}>Thông tin cờ sở</Typography>
                                    <Typography fontSize={'1.125rem'} lineHeight={'2.375rem'} color="#717171">{room?.data.privacy.name}</Typography>
                                    <Typography fontSize={'1.125rem'} lineHeight={'2.375rem'} color="#717171">Phòng ngủ: {room?.data.bedroom}, Phòng tắm:{room?.data.bathroom} </Typography>
                                    <Typography fontSize={'1.125rem'} lineHeight={'2.375rem'} color="#717171">Người lớn: {room?.data.adult}, Trẻ em:{room?.data.child} </Typography>

                                </Box>
                                <Box>
                                    <Typography fontSize={'1.125rem'} lineHeight={'2.375rem'} color="#717171" fontWeight={600}>Vị trí</Typography>
                                    <Typography fontSize={'1.125rem'} lineHeight={'2.375rem'} color="#717171"> {room?.data.address.country}, {room?.data.address.street}, {room?.data.address.city}, {room?.data.address.state}</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                    <Box mt={5}>
                        <FooterBecomeHost progressInput={98} disabled={false} backTo={`/become-host/${params.slug}/discount`} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default Page;