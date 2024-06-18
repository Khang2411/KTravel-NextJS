export interface Address {
    id?: number | string,
    listing_id?: number | string,
    country: string,
    street: string,
    city: string,
    state: string,
}

export interface Country {
    common: string
}

export interface CountryResponse<T> {
    id?: number | string
    name: T | string
}