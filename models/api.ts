export interface ListParams {
	page: number
	limit: number
	title_like?: string
}


export interface ListResponse<T> {
	data: Array<T>
}

export interface ResponsePaginate<T> {
	page: number
	current_page: number
	next_page_url: string
	data: Array<T>
}

export interface Response<T> {
	data: T
}
