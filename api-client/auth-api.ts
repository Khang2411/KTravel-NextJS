import { LoginPayload, RegisterPayload, Response, UserProfile } from '@/models'
import Cookies from 'js-cookie'
import axiosClient from './axios-client'

export const authApi = {
	login(payload: LoginPayload) {
		return axiosClient.post('/v1/login', payload)
	},

	register(payload: RegisterPayload) {
		return axiosClient.post('/v1/register', payload)
	},

	logout() {
		return axiosClient.post('/v1/logout')
	},

	update(payload: UserProfile) {
		return axiosClient.post('/v1/profile/update', payload)
	},

	getProfile(): Promise<Response<UserProfile>> {
		axiosClient.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('accessToken')}`; // post hide authorization on web
		return axiosClient.get('/v1/profile')
	},

	socialLogin(payload: LoginPayload) {
		return axiosClient.post('/v1/social/login', payload)
	},

	fotgotPassword(payload: { email: string }) {
		return axiosClient.post('/v1/forgot-password', payload)
	},

	resetPassword(payload: { email: string, password: string, password_confirmation: string, token: string }) {
		return axiosClient.post('/v1/reset-password', payload)
	},
	
	verify(payload: { front_card?: File, back_card?: File, selfile?: string }) {
		return axiosClient.post('/v1/account/verify', payload)
	},

	selfile(payload: string) {
		return axiosClient.post('/v1/account/selfile', payload)
	}
}