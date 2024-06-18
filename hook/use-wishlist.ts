import { categoryApi } from '@/api-client/category'
import { wishlistApi } from '@/api-client/wishlist-api'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

interface UseWishlistProps {
    options?: SWRConfiguration
    enable?: boolean
}

export function useWishlist({ options, enable }: UseWishlistProps) {
    const swrResponse = useSWR(
        enable ? [QueryKeys.GET_WISHLIST_LIST] : null,
        () => wishlistApi.getAll(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    const addWishlist = async (params: { listing_id: number | string }) => {
        const room = await wishlistApi.add(params);
        return room;
    }

    return { ...swrResponse, addWishlist }
}