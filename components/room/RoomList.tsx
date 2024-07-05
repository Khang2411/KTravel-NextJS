"use client";
import { ResponsePaginate, Room } from "@/models";
import { Box, Grid } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RoomCard } from "./RoomCard";

type TravelListProps = {
  rooms: ResponsePaginate<Room>;
};

export const RoomList = ({ rooms }: TravelListProps) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const pathname = usePathname();
  const [observer, setObserver] = useState(rooms.data);
  const searchParams = useSearchParams();

  const fetchImages = async () => {
    if (rooms.next_page_url) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/rooms?page=${rooms.current_page + 1}` +
          `&limit=12&category_id=${
            searchParams.get("category_id")
              ? searchParams.get("category_id")
              : ""
          }`,
        { next: { revalidate: 500 } }
      );
      const results = await response.json();
      setObserver((prev) => [...prev, ...results.data.data]);
      rooms.next_page_url = results.data.next_page_url;
      rooms.current_page = results.data.current_page;
    }
  };

  useEffect(() => {
    setObserver(rooms.data);
    //because mutatte by category for server page api
  }, [rooms.data]);

  useEffect(() => {
    inView && fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Box>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        closeOnClick
        hideProgressBar
      />
      <Grid container spacing={3}>
        {observer.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={pathname === "/search" ? 6 : 4}
            lg={pathname === "/search" ? 4 : 3}
            key={index}
          >
            <RoomCard room={item}></RoomCard>
            {index === observer.length - 5 && <Box ref={ref}></Box>}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
