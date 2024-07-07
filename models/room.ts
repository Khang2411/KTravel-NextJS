import { Address } from "./address"
import { Amenities } from "./amenities"
import { UserProfile } from "./auth"
import { Category } from "./category"
import { ListingImage } from "./image"
import { Order } from "./order"
import { Privacy } from "./privacy"
import { Wishlist } from "./wishlist"

export interface Room {
	status: string
	user: UserProfile
	id: string | number
	host_id: string | number
	privacy_id: string | number
	name: string,
	category_id: string | number
	host_name: string,
	description: string
	latitude: number,
	longitude: number,
	room_type: string,
	price: number,
	adult: number,
	child: number,
	bedroom: number,
	bathroom: number,
	minimum_nights: number,
	number_of_reviews: number,
	neighbourhood: string
	weekly_discount: number
	monthly_discount: number
	new_discount: number
	orders: Array<Order>
	amenities: Array<Amenities>
	images: Array<ListingImage>
	privacy: Privacy
	address: Address
	category: Category
	wishlist: Array<Wishlist>
	updated_at: string
	created_at: string
}

export interface RoomFiltersPayload {
	search: string
}