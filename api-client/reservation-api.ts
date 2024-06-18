import { ListParams, ListResponse } from '@/models'
import axiosClient from './axios-client'

export const reservationApi = {
    getAll(params: Partial<ListParams>): Promise<ListResponse<any>> {
        return axiosClient.get('/v1/reservation', { params })
    },

    // get(id: string): Promise<Amenities> {
    // 	return axiosClient.get(`/v1/amenities/${id}`)
    // },
}