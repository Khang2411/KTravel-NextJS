'use client'
import { useAuth } from '@/hook';
import { useWishlist } from '@/hook/use-wishlist';
import { Room } from '@/models';
import { Box, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

import { ModalContext } from '../common/header/UserMenu';
import { LoginModal } from '../modal';

type RoomHeroProps = {
    room: Room
}

export const RoomHeroDesktop = ({ room }: RoomHeroProps) => {
    const { isLoggedIn } = useAuth()
    const { addWishlist } = useWishlist({ enable: false })
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegModal, setOpenRegModal] = useState(false);
    
    const handleWishlist = async (roomId: number | string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!isLoggedIn) {
            setOpenLoginModal(!openLoginModal)
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
        <>
            <Box sx={{ margin: "16px 0", display: { xs: 'none', sm: 'block' } }}>
                <ToastContainer
                    position="bottom-left"
                    autoClose={2000}
                    closeOnClick
                    hideProgressBar
                />
                <Box textAlign={'right'} mr={1}>
                    <IconButton aria-label="favorite"
                        sx={{
                            padding: '0 !important',
                            color: '#ffff',
                            zIndex: '10',
                        }}
                        onClick={(e) => handleWishlist(room.id, e)}>
                        <AiOutlineHeart className="fill-white absolute" />
                        <AiFillHeart className={room.wishlist?.length > 0 ? "fill-rose-500" : "fill-neutral-500/70"} />
                    </IconButton>
                    <Typography component={'span'} sx={{ textDecoration: 'underline' }}>Lưu</Typography>
                </Box>
                <ImageList
                    sx={{
                        width: '100%',
                        height: { sm: '45vh' },
                    }}
                    cols={4}
                    gap={8}
                >
                    {room.images.map((image, index) =>
                        <ImageListItem cols={index === 0 ? 2 : 1} rows={index === 0 ? 2 : 1} sx={{ position: 'relative' }} key={index}>
                            <Image src={image.image} alt={"detail-room-img"} fill style={{ objectFit: 'cover', borderRadius: '10px' }}></Image>
                        </ImageListItem>
                    )}
                </ImageList>
                <ToastContainer
                    position="bottom-left"
                    autoClose={2000}
                    closeOnClick
                    hideProgressBar
                />
                <ModalContext.Provider value={{ openLoginModal, setOpenLoginModal, openRegModal, setOpenRegModal }}>
                    <LoginModal />
                </ModalContext.Provider>
            </Box>
        </>
    )
}

