import { Country, CountryResponse } from '@/models'
import axiosClient from './axios-client'

export const addressApi = {
	getAll(): Promise<Array<CountryResponse<Country>>> {  // Partial là chấp nhận ListParams  lấy 1 phần không lấy hết
		return axiosClient.get('https://restcountries.com/v3.1/region/asia')
	},
}