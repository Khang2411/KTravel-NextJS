'use client'
// Import Swiper styles
import { Category } from "@/models";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import mutateCategory from './mutateCategory';

type CategoryItemProps = {
    category: Category
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const search = searchParams.get('category_id')

    const handleCategory = (slug: string, cateid: string | number) => {
        router.push(`/?tab=${slug}&category_id=${cateid}`)
    }
    return (
        <>
            <Box id={`cate-${search}`} sx={{ opacity: '0.5', cursor: 'pointer', borderBottom: search == category.id ? '3px solid #000' : 'initial' }} onClick={() => handleCategory(category.slug, category.id)}>
                <Image src="/images/category.png" alt={"travel-img"} width={32} height={32} style={{ margin: 'auto' }} />
                <Typography fontSize={12} fontWeight={600}>{category.name}</Typography>
            </Box >
        </>
    );
}
