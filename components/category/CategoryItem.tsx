'use client'
// Import Swiper styles
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CategoryItemProps = {
    category: any
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <>
            <Link href={`?tab=${category.slug}&id=${category.id}`}>
                <Box sx={{ opacity: '0.5' }}>
                    <Image src="/images/category.png" alt={"travel-img"} width={32} height={32} style={{ margin: 'auto' }} />
                    <Typography fontSize={12} fontWeight={600}>{category.name}</Typography>
                </Box>
            </Link>
        </>
    );
}
