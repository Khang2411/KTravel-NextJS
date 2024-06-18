import { amenitiesApi } from '@/api-client/amenities'
import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'

export interface useAmenitiesListProps {
    params?: Partial<ListParams>
    options?: SWRConfiguration
    enabled?: boolean
}

export function useAmenitiesList({ params, options }: useAmenitiesListProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_AMENITY_LIST, params],
        () => amenitiesApi.getAll(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}