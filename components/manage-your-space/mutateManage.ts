'use server';
import { revalidatePath } from 'next/cache'

export default async function mutateManage() {
    return revalidatePath('/manage-your-space/[id]/details', 'page')
}
