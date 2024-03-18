'use client'
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import Image from 'next/image';
import { Keyboard, Navigation, Pagination } from "swiper/modules";

export const RoomHeroMobile = () => (

    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Swiper
            pagination={{
                type: "fraction",
            }}
            navigation={true}
            keyboard={true}
            modules={[Pagination, Navigation, Keyboard]}
            className="mySwiper"
        >
            <SwiperSlide>
                <Image src={'/images/travel.jpeg'} alt={""} fill style={{ objectFit: 'cover' }}></Image>
            </SwiperSlide>
            <SwiperSlide>
                <Image src={'/images/travel.jpeg'} alt={""} fill style={{ objectFit: 'cover' }}></Image>
            </SwiperSlide>
        </Swiper>
    </Box>

)

