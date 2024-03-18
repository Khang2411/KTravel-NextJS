'use client'
import { ResponsePaginate, Room } from "@/models";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { RoomCard } from "./RoomCard";

interface TravelListProps {
    rooms: ResponsePaginate<Room>
}
export const RoomList = ({ rooms }: TravelListProps) => {
    const { ref, inView, entry } = useInView({ threshold: 0 });
    const [observer, setObserver] = useState(rooms.data);

    const fetchImages = async () => {
        console.log(rooms.next_page_url)
        
        if (rooms.next_page_url) {
            const response = await fetch(rooms.next_page_url, { next: { revalidate: 500 } });
            const results = await response.json();
            console.log(results);
            setObserver((prev: any) => [...prev, ...results.data.data]);
            rooms.next_page_url = results.data.next_page_url
        }
    };

    useEffect(() => {
        inView && fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
        <Box>
            <Grid container spacing={3}>
                {observer.map((item, index) => <RoomCard room={item} key={index}></RoomCard>)}
            </Grid>
            <Box ref={ref}></Box>
        </Box>

    )
}

