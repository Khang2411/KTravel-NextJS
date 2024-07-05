'use server';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

export default async function mutateSearch(search: string) {
    // return revalidatePath('/search', 'page')
    return redirect(search)
}
