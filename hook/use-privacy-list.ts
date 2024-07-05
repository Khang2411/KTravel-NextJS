import { privacyApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface usePrivacyListProps {
    options?: SWRConfiguration
}

export function usePrivacyList({ options}: usePrivacyListProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_ROOM_LIST],
        () => privacyApi.getAll(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}