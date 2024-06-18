export interface Amenities {
    id: string
    name: string
    icon: string
    created_at: string
    updated_at: string
}

export interface AmenitiesFiltersPayload {
    search: string
}