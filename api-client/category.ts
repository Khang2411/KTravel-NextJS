import { Category, ListResponse } from '@/models'
import axiosClient from './axios-client'

export const categoryApi = {
	getAll(): Promise<ListResponse<Category>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('/v1/categories')
	},

	get(id: string): Promise<Category> {
		return axiosClient.get(`/v1/categories/${id}`)
	},
}