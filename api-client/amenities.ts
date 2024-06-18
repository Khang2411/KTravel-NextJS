import { Amenities, ListResponse } from '@/models'
import axiosClient from './axios-client'

export const amenitiesApi = {
	getAll(): Promise<ListResponse<Amenities>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('/v1/amenities')
	},

	get(id: string): Promise<Amenities> {
		return axiosClient.get(`/v1/amenities/${id}`)
	},
}