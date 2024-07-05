'use server';
import { revalidatePath } from 'next/cache'

export default async function mutateBecomeHost() {
    return revalidatePath('/become-host', 'page')
}