import {NextResponse} from 'next/server';
import prisma from 'lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany({});
        return NextResponse.json(users, {status: 200});
    } catch (error) {
        return NextResponse.json('Failed to fetch all users', {
            status: 500,
        });
    }
}
