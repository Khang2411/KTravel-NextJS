import { ListParams, ListResponse, Room } from '@/models'
import axiosClient from './axios-client'

export const roomApi = {
	getAll(params: Partial<ListParams>): Promise<ListResponse<Room>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('/v1/rooms', { params })
	},

	get(id: string): Promise<Room> {
		return axiosClient.get(`/v1/rooms/${id}`)
	},
}