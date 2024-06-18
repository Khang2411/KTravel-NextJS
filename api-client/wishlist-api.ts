import { ListResponse, Response, ResponseWishlist, Wishlist } from '@/models'
import axiosClient from './axios-client'

export const wishlistApi = {
    getAll(): Promise<ListResponse<Wishlist>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
        return axiosClient.get('/v1/wishlist')
    },

    add(params: { listing_id: number | string }): Promise<Response<ResponseWishlist>> {
        return axiosClient.post(`/v1/wishlist/add`, params)
    },
}