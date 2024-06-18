import { categoryApi } from '@/api-client/category'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'


export interface UseCategoryListProps {
    options?: SWRConfiguration
}

export function useCategoryList({ options}: UseCategoryListProps) {
    const swrResponse = useSWR(
        [QueryKeys.GET_CATEGORY_LIST],
        () => categoryApi.getAll(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )

    return swrResponse
}