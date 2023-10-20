import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';
import {user} from '@prisma/client';

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const id = params.id;

    try {
        const User = await prisma.user.findUnique({
            where: {
                email: id,
            },
        });
        return NextResponse.json(User);
    } catch (error) {
        return NextResponse.json(
            {mesagge: 'Failed to fetch user'},
            {status: 404}
        );
    }
}
