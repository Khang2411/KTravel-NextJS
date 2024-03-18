'use client'
import { CategoryItem } from "@/components/category/CategoryItem";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Category } from "@/models";
import { Key } from "react";
import 'swiper/css';
import 'swiper/css/navigation';

type Categories = {
    categories: Array<Category>
}

export const CategoryList = ({ categories }: Categories) => {
    return (
        <>
            <Swiper
                className="swiper-horizontal-category"
                slidesPerView={'auto'}
                spaceBetween={90}
                navigation={true}
                modules={[Navigation]}
            >
                {categories?.map((item, index: Key) =>
                    <SwiperSlide className="category-slide" key={index}>
                        <CategoryItem category={item} />
                    </SwiperSlide>)}
            </Swiper >
        </>
    )
}