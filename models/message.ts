import { Room } from "./room"

export interface Message {
    id: number | string
    listing_id: string | number
    user1_id: string | number
    user2_id: string | number
    message_contents: any
    user_from: any
    user_to: any
    listing: Room
    updated_at: string,
    created_at: string
}