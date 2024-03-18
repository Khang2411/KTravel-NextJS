import { roomApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'


export interface UseWorkListProps {
    params: Partial<ListParams>
    options?: SWRConfiguration
    enable: boolean
}

export function useRoomList({ params, options, enable }: UseWorkListProps) {
    const swrResponse = useSWR(
        enable ? [QueryKeys.GET_ROOM_LIST, params] : null,
        () => roomApi.getAll(params),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}