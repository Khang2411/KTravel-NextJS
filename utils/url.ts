export function encodeUrl(str: string): string {
	const base64 = Buffer.from(str).toString('base64')
	return encodeURIComponent(base64)
}

export function decodeUrl(str: string): string {
	const base64 = decodeURIComponent(str)
	return Buffer.from(base64, 'base64').toString()
}