'use client'
import { authApi } from '@/api-client'
import { QueryKeys, StorageKeys } from '@/constants'
import { LoginPayload, RegisterPayload, UserProfile } from '@/models'
import Cookies from 'js-cookie'
import { signOut } from "next-auth/react"
import useSWR, { SWRConfiguration } from 'swr'

export function useAuth(options?: Partial<SWRConfiguration>) {
	const {
		data: profile,
		error,
		isLoading,
		mutate,
	} = useSWR([QueryKeys.GET_PROFILE], () => authApi.getProfile(), {
		dedupingInterval: 60 * 60 * 1000, // 1hr
		revalidateOnFocus: false,
		...options,
		onSuccess(data) {
			localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data))
		},
		onError(err) {
			console.log(err)
			logout()
		},
	})

	async function login(payload: LoginPayload) {
		const login = await authApi.login(payload)
		Cookies.set('accessToken', login.data.token)
		mutate() 		// Load Api Default SWR (profile)
	}

	async function register(payload: RegisterPayload) {
		const register = await authApi.register(payload)
		const login = await authApi.login(payload)
		Cookies.set('accessToken', login.data.token)
		mutate()
		return register
	}

	async function logout() {
		localStorage.removeItem(StorageKeys.USER_INFO)
		Cookies.remove('accessToken')
		await authApi.logout()
		signOut()
		mutate({ data: null! }, false)
	}

	async function socialLogin(payload: LoginPayload) {
		const socialLogin = await authApi.socialLogin(payload)
		Cookies.set('accessToken', socialLogin.data.token)
		mutate()
	}

	async function update(payload: Partial<UserProfile>) {
		await authApi.update(payload as any)
		mutate()
	}

	async function forgotPassword(payload: { email: string }) {
		const forgotPassword = await authApi.fotgotPassword(payload)
		return forgotPassword
	}

	async function resetPassword(payload: { email: string, password: string, password_confirmation: string, token: string }) {
		const forgotPassword = await authApi.resetPassword(payload)
		return forgotPassword
	}

	async function verify(payload: { front_card?: File, back_card?: File, selfile?: string }) {
		const verify = await authApi.verify(payload)
		return verify
	}

	return {
		profile,
		isLoading,
		mutate,
		error,
		login,
		register,
		logout,
		socialLogin,
		forgotPassword,
		resetPassword,
		verify,
		update,
		isLoggedIn: Boolean(profile?.data)
	}
}