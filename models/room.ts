import { Amenities } from "./amenities"
import { Order } from "./order"

export interface Room {
	id: string
	name: string,
	thumbnail: string,
	host_name: string,
	latitude: number,
	longtitude: number,
	room_type: string,
	price: number,
	adult: number,
	child: number,
	minimum_nights: number,
	number_of_reviews: number,
	neighbourhood: string
	orders: Array<Order>
	amenities: Array<Amenities>

}

export interface RoomFiltersPayload {
	search: string
}