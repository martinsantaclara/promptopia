import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';
import {post} from '@prisma/client';

export async function POST(request: Request) {
    const data: post = await request.json();
    const {prompt, tag, creator} = data;

    // const date3 = new Date();
    // const createdAt = new Date(
    //     date3.getTime() - date3.getTimezoneOffset() * 60 * 1000
    // );

    // const formattedToday = Intl.DateTimeFormat('en-US', {
    //     dateStyle: 'short',
    //     timeStyle: 'short',
    //     timeZone: 'America/Swift_Current',
    // }).format(new Date());
    // const createdAt = new Date(formattedToday);

    const createdAt = new Date();
    try {
        let nuevoPost = await prisma.post.create({
            data: {
                prompt,
                tag,
                createdAt,
                creator,
            },
        });
        return NextResponse.json({mesagge: 'Joya post'}, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {mesagge: 'Failed to created post', data: data, error: error},
            {status: 409}
        );
    }
}
export async function PATCH(request: Request) {
    const data: post = await request.json();
    const {id, prompt, tag} = data;

    try {
        const updatePost = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                prompt: prompt,
                tag: tag,
            },
        });
        return NextResponse.json({messagge: 'updated successfully'});
    } catch (error) {
        return NextResponse.json(
            {mesagge: 'Failed to update post', data: data, error: error},
            {status: 409}
        );
    }
}

export async function PUT(request: Request) {
    const data: post = await request.json();
    const {id, prompt, tag} = data;

    try {
        const updatePost = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                prompt: prompt,
                tag: tag,
            },
        });
        return NextResponse.json({messagge: 'updated successfully'});
    } catch (error) {
        return NextResponse.json(
            {mesagge: 'Failed to update post', data: data, error: error},
            {status: 409}
        );
    }
}
