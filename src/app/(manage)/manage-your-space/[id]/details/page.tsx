import { AmenitiesManage, Basics, Discount, LinkScroll, Location, Price, PropertyRooms } from "@/components/manage-your-space";
import { Box, Divider, Stack } from "@mui/material";
import { cookies } from 'next/headers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getRoom = async (id: string | number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/rooms/${id}`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
        },
    })
    return res.json();
}

const Page = async ({ params }: { params: { id: number } }) => {
    const room = await getRoom(params.id)

    return (
        <Box sx={{ maxWidth: '1440px', paddingInline: { xs: '24px', md: '80px' } }}>
            <ToastContainer />

            <Stack direction={'row'} gap={8}>
                <Box display={{ md: 'block', xs: 'none' }}>
                    <LinkScroll room={room?.data} />
                </Box>

                <Box>
                    <Basics id={params.id} title={room?.data.name} description={room?.data.description}></Basics>
                    <Divider />
                    <AmenitiesManage id={params.id} amenities={room?.data.amenities}></AmenitiesManage>
                    <Divider />
                    <Location id={params.id} address={room?.data.address} longitude={room?.data.longitude} latitude={room?.data.latitude} />
                    <Divider />
                    <PropertyRooms id={params.id} privacy={room?.data.privacy} category={room?.data.category} adult={room?.data.adult} child={room?.data.child} bedroom={room?.data.bedroom} bathroom={room?.data.bathroom}></PropertyRooms>
                    <Divider />
                    <Price id={params.id} price={room?.data.price}></Price>
                    <Divider />
                    <Discount id={params.id} weekly_discount={room?.data.weekly_discount} monthly_discount={room?.data.monthly_discount} new_discount={room?.data.new_discount}></Discount>
                </Box>
            </Stack >
        </Box >
    )
}
export default Page;