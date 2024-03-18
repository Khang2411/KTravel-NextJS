export interface LoginPayload {
	email: string
	password: string
}
export interface RegisterPayload {
	name: string
	email: string
	phone: string
	password: string
	password_confirmation: string
}

export interface UserProfile {
	id: number,
	name: string,
	email: string,
	email_verified_at: string,
	phone: string,
	created_at: string,
	updated_at: string,
}

