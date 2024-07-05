
'use client'
import { roomApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UsePostDetailsProps {
    params: string | number
    options?: SWRConfiguration
}

export function useRoomDetails({ params, options }: UsePostDetailsProps) {

    const swrResponse = useSWR(
        [QueryKeys.GET_ROOM_DETAIL, params],
        () => roomApi.get(params),
        {
            dedupingInterval: 3 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}
