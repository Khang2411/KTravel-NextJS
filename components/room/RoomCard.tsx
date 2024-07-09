"use client";
import { useAuth } from "@/hook";
import { useWishlist } from "@/hook/use-wishlist";
import { Room } from "@/models";
import StarIcon from "@mui/icons-material/Star";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { addDays, format, isAfter } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ModalContext } from "../common/header/UserMenu";
import { LoginModal } from "../modal";

type RoomCard = {
  room: Room;
};

export const RoomCard = ({ room }: RoomCard) => {
  const { isLoggedIn } = useAuth();
  const [state, setState] = useState({ search: "" });
  const searchParams = useSearchParams();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegModal, setOpenRegModal] = useState(false);
  const { addWishlist } = useWishlist({ enable: false });
  const pathname = usePathname();

  function getDatesInRange(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form\
    current.set("adult", "1");
    current.set("child", "0");
    const arrayDisabled = room.orders.map(
      (i: { check_in: Date; check_out: Date }) =>
        getDatesInRange(i.check_in, i.check_out)
    ) as [];
    const disabled = [].concat.apply([], arrayDisabled);

    if (disabled.length > 0) {
      for (let i = 0; i < disabled.length; i++) {
        let length = Math.round(
          (disabled[i + 1] - disabled[i]) / (1000 * 3600 * 24)
        );
        if (length > 3 && isAfter(addDays(disabled[i], 1), new Date())) {
          const check_in = format(
            new Date(addDays(disabled[i], 1) as Date),
            "Y/MM/dd"
          );
          const check_out = format(
            new Date(addDays(disabled[i], 3) as Date),
            "Y/MM/dd"
          );
          current.set("check_in", check_in.toString());
          current.set("check_out", check_out.toString());
          const search = current.toString();
          setState({ search: search });
        } else {
          const check_in = format(
            new Date(addDays(disabled[disabled.length - 1], 1) as Date),
            "Y/MM/dd"
          );
          const check_out = format(
            new Date(addDays(disabled[disabled.length - 1], 3) as Date),
            "Y/MM/dd"
          );
          current.set("check_in", check_in.toString());
          current.set("check_out", check_out.toString());
          const search = current.toString();
          setState({ search: search });
        }
      }
    } else {
      current.set("check_in", format(new Date(), "Y/MM/dd").toString());
      current.set(
        "check_out",
        format(addDays(new Date(), 2), "Y/MM/dd").toString()
      );
      const search = current.toString();
      setState({ search: search });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWishlist = async (
    roomId: number | string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isLoggedIn) {
      setOpenLoginModal(!openLoginModal);
      return;
    } else {
      const data = { listing_id: roomId };
      const wishlish = await addWishlist(data);

      const nextElementSibling = (e.target as HTMLElement).nextElementSibling;
      if (wishlish.data?.addWishlistItem) {
        nextElementSibling?.classList.toggle("fill-rose-500");
        nextElementSibling?.classList.remove("fill-neutral-500/70");
        toast(
          <Box>
            {" "}
            Đã thêm vào danh sách{" "}
            <Typography
              component={"span"}
              style={{ fontWeight: "bold", color: "#000" }}
            >
              {" "}
              yêu thích
            </Typography>{" "}
          </Box>
        );
      } else {
        console.log("remove");
        nextElementSibling?.classList.remove("fill-rose-500");
        nextElementSibling?.classList.toggle("fill-neutral-500/70");
      }
    }
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper-card-room"
        >
          {room.images.map((image, index) => (
            <SwiperSlide key={index} style={{display:'block'}}>
              <Link href={`/room/${room.id}?${state.search}`} target="_blank">
                <Image
                  src={image.image}
                  alt={"travel-img"}
                  width={285}
                  height={285}
                  style={{
                    objectFit: "cover",
                    aspectRatio: "20/19",
                    borderRadius: "15px",
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton
          aria-label="favorite"
          sx={{
            padding: "0 !important",
            position: "absolute",
            color: "#ffff",
            top: "12px",
            right: "12px",
            zIndex: "10",
          }}
          onClick={(e) => handleWishlist(room.id, e)}
        >
          <AiOutlineHeart className="fill-white absolute" />
          <AiFillHeart
            className={
              room.wishlist?.length > 0
                ? "fill-rose-500"
                : "fill-neutral-500/70"
            }
          />
        </IconButton>
        <Box sx={{ marginTop: "5px" }}>
          <Stack direction={"row"} justifyContent={"space-between"} gap={2.5}>
            <Box>
              <Box>
                <Typography fontWeight={600} fontSize={14}>
                  {room?.name}, {room?.address.country}
                </Typography>
              </Box>
              <Box>
                <Typography color="rgb(115 115 115)">
                  {room?.room_type}
                </Typography>
              </Box>
              <Box>
                <Stack direction={"row"} gap={0.5}>
                  <Typography fontWeight={600} fontSize={14}>
                    {room?.price}$
                  </Typography>
                  <Typography fontSize={14}>/</Typography>
                  <Typography fontSize={14}>đêm</Typography>
                </Stack>
              </Box>
            </Box>

            <Box>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <StarIcon sx={{ fontSize: "15px" }} />
                <Typography fontSize={"16px"}>4,5</Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
      <ModalContext.Provider
        value={{
          openLoginModal,
          setOpenLoginModal,
          openRegModal,
          setOpenRegModal,
        }}
      >
        <LoginModal />
      </ModalContext.Provider>
    </>
  );
};
