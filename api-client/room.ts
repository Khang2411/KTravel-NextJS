import { Address, ListParams, ListResponse, Response, Room } from '@/models'
import axiosClient from './axios-client'

export const roomApi = {
	getAll(params: Partial<ListParams>): Promise<ListResponse<Room>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('/v1/rooms', { params })
	},

	get(id: string | number): Promise<Response<Room>> {
		return axiosClient.get(`/v1/rooms/${id}`)
	},

	add(params: Partial<Room>): Promise<Response<Room>> {
		return axiosClient.post(`/v1/room/create`, params)
	},

	update(params: Partial<Room>): Promise<Response<Room>> {
		return axiosClient.post(`/v1/room/update`, params)
	},

	addressUpdate(params: Address): Promise<Response<Address>> {
		return axiosClient.post(`/v1/room/address/update`, params)
	}
}