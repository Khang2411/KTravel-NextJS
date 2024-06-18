import { reservationApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'

export interface useReservationListProps {
    params: Partial<ListParams>
    options?: SWRConfiguration
}

export function useReservationList({ params, options }: useReservationListProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_RESERVATION_LIST, params],
        () => reservationApi.getAll(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}