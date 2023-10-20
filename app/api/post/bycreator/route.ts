import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const creator = searchParams.get('creator');

    // const obj = Object.fromEntries(searchParams.entries());
    //include: {
    //    user: true,
    //},

    try {
        const posts = await prisma.post.findMany({
            where: {
                creator: creator as string,
            },
        });
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        return NextResponse.json('Failed to fetch all posts', {
            status: 500,
        });
    }
}
