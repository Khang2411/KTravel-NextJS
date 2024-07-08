import { AmenitiesManage, Basics, Discount, LinkScroll, Location, Price, PropertyRooms } from "@/components/manage-your-space";
import { Box, Divider, Stack } from "@mui/material";
import { cookies } from 'next/headers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Response, Room } from "@/models";

const getRoom = async (id: number): Promise<Response<Room>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/rooms/${id}`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
        },
    })
    return res.json() as Promise<Response<Room>>;
}
 
const Page = async ({ params }: { params: { listing_id: number } }) => {
    const room = await getRoom(params.listing_id)
   
    return (
        <Box sx={{ maxWidth: '1440px', paddingInline: { xs: '24px', md: '80px' } }}>
            <ToastContainer />

            <Stack direction={'row'} gap={8}>
                <Box display={{ md: 'block', xs: 'none' }}>
                    <LinkScroll room={room?.data} />
                </Box>

                <Box>
                    <Basics id={params.listing_id} title={room?.data.name} description={room?.data.description} edit={false}></Basics>
                    <Divider />
                    <AmenitiesManage id={params.listing_id} amenities={room?.data.amenities} edit={false}></AmenitiesManage>
                    <Divider />
                    <Location id={params.listing_id} address={room?.data.address} longitude={room?.data.longitude} latitude={room?.data.latitude} edit={false}/>
                    <Divider />
                    <PropertyRooms edit={false} id={params.listing_id} privacy={room?.data.privacy} category={room?.data.category} adult={room?.data.adult} child={room?.data.child} bedroom={room?.data.bedroom} bathroom={room?.data.bathroom}></PropertyRooms>
                    <Divider />
                    <Price id={params.listing_id} price={room?.data.price} edit={false}></Price>
                    <Divider />
                    <Discount id={params.listing_id} weekly_discount={room?.data.weekly_discount} monthly_discount={room?.data.monthly_discount} new_discount={room?.data.new_discount} edit={false}></Discount>
                </Box>
            </Stack >
        </Box >
    )
}
export default Page;