import { ListResponse, Privacy } from '@/models'
import axiosClient from './axios-client'

export const privacyApi = {
	getAll(): Promise<ListResponse<Privacy>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('/v1/privacy')
	},
}