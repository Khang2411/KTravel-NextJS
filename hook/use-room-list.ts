import { roomApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import { Address, ListParams, Room } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'


export interface UseWorkListProps {
    params?: Partial<ListParams>
    options?: SWRConfiguration
    enable: boolean
}

export function useRoomList({ params, options, enable }: UseWorkListProps) {
    // const swrResponse = useSWR(
    //     enable ? [QueryKeys.GET_ROOM_LIST, params] : null,
    //     () => roomApi.getAll(params),
    //     {
    //         dedupingInterval: 30 * 1000, // 30s
    //         keepPreviousData: true,
    //         ...options,
    //     }
    // )

    const addRoom = async (params: Partial<Room>) => {
        const room = await roomApi.add(params);
        return room;
    }

    const updateRoom = async (params: Partial<Room>) => {
        const room = await roomApi.update(params);
        return room;
    }

    const updateRoomAddress = async (params: Address) => {
        const address = await roomApi.addressUpdate(params);
        return address;
    }
    return { addRoom, updateRoom, updateRoomAddress }
}