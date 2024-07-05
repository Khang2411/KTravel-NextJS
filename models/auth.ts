export interface LoginPayload {
	email: string
	password: string
}
export interface RegisterPayload {
	name: string
	email: string
	password: string
	password_confirmation: string
}

export interface UserProfile {
	verify_account: number | undefined
	id: number | string,
	name: string,
	email: string,
	email_verified_at: string,
	phone: string,
	avatar: string | File,
	password: string,
	password_confirmation: string,
	password_current: string,
	created_at: string,
	updated_at: string,
}

