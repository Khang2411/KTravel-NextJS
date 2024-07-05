export interface Wishlist {
    id: string
    user_id: string | number
    listing_id: string | number
    created_at: string
    updated_at: string
}

export interface ResponseWishlist {
    addWishlistItem?: { listing_id: string | number, statusCode: string }
    deleteWishlistItem?: { listing_id: string | number, statusCode: string }
}