'use client'
import { authApi } from '@/api-client'
import { QueryKeys, StorageKeys } from '@/constants'
import { LoginPayload, RegisterPayload } from '@/models'
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
		dedupingInterval: 10 * 1000, // 1hr
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
		return register
	}

	async function logout() {
		localStorage.removeItem(StorageKeys.USER_INFO)
		Cookies.remove('accessToken')
		await authApi.logout()
		signOut()
		mutate({ data: null! }, false)
	}

	async function forgotPassword(payload: { email: string }) {
		const forgotPassword = await authApi.fotgotPassword(payload)
		return forgotPassword
	}

	async function socialLogin(payload: LoginPayload) {
		const socialLogin = await authApi.socialLogin(payload)
		Cookies.set('accessToken', socialLogin.data.token)
		mutate()
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
		isLoggedIn: Boolean(profile?.data)
	}
}