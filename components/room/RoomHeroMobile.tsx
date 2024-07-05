'use client'
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { useAuth } from '@/hook';
import { useWishlist } from '@/hook/use-wishlist';
import { Room } from '@/models';
import { IconButton } from "@mui/material";
import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { ModalContextRoomMobile } from '../common/header/HeaderRoomMobile';
import { LoginModal } from '../modal';

type RoomHeroProps = {
    room: Room
}

export const RoomHeroMobile = ({ room }: RoomHeroProps) => {
    const { isLoggedIn } = useAuth()
    const { addWishlist } = useWishlist({ enable: false })
    const [openLoginMobile, setOpenLoginMobile] = useState(false);

    const handleWishlist = async (roomId: number | string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!isLoggedIn) {
            setOpenLoginMobile(!openLoginMobile)
            return
        } else {
            const data = { listing_id: roomId }
            const wishlish = await addWishlist(data)

            const nextElementSibling = (e.target as HTMLElement).nextElementSibling;
            if (wishlish.data?.addWishlistItem) {
                nextElementSibling?.classList.toggle("fill-rose-500");
                nextElementSibling?.classList.remove("fill-neutral-500/70");
                toast(<Box> Đã thêm vào danh sách <Typography component={'span'} style={{ fontWeight: "bold", color: "#000" }}> yêu thích</Typography> </Box>)
            } else {
                console.log('remove')
                nextElementSibling?.classList.remove("fill-rose-500");
                nextElementSibling?.classList.toggle("fill-neutral-500/70");
            }
        }
    }

    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }} position={'relative'}>
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                closeOnClick
                hideProgressBar
            />
            <Box position={'absolute'} top={'12.5px'} right={'10px'} zIndex={999}>
                <IconButton aria-label="favorite" sx={{
                    fontSize: 35, padding: '0 !important',
                    color: '#ffff',
                    zIndex: '10',
                }} onClick={(e) => handleWishlist(room.id, e)}>
                    <AiOutlineHeart className="fill-white absolute" />
                    <AiFillHeart className={room.wishlist?.length > 0 ? "fill-rose-500" : "fill-neutral-500/70"} />
                </IconButton>
            </Box>

            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    type: "fraction",
                }}
                keyboard={true}
                modules={[Pagination, Navigation, Keyboard, Autoplay]}
                className="mySwiper"
            >
                {room.images.map((image, index) =>
                    <SwiperSlide key={index}>
                        <Image src={image.image} alt={"detail-room-img"} fill style={{ objectFit: 'cover' }}></Image>
                    </SwiperSlide>
                )}
            </Swiper>
            <ModalContextRoomMobile.Provider value={{ openLoginMobile, setOpenLoginMobile }}>
                <LoginModal />
            </ModalContextRoomMobile.Provider>
        </Box>
    )
}

