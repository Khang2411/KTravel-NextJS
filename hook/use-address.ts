import { addressApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface useAmenitiesListProps {
    options?: SWRConfiguration
    enabled?: boolean
}

export function useAddress({ options }: useAmenitiesListProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_ADDRESS],
        () => addressApi.getAll(),
        {
            dedupingInterval: 3600 * 1000, // 1hour
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}