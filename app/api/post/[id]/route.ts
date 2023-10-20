import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';
import {post} from '@prisma/client';

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const id = params.id;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            {mesagge: 'Failed to fetch post'},
            {status: 404}
        );
    }
}

export async function DELETE(
    request: Request,
    {params}: {params: {id: string}}
) {
    const id = params.id;

    try {
        const deletedRow = await prisma.post.delete({
            where: {id: parseInt(id)},
        });
        return NextResponse.json(
            {mesagge: 'Joya delete', id: id},
            {status: 200}
        );
    } catch (error) {
        return NextResponse.json(
            {mesagge: 'Failed to delete post'},
            {status: 404}
        );
    }
}

export async function PUT(request: Request, {params}: {params: {id: string}}) {
    const data: post = await request.json();
    const {prompt, tag} = data;
    const id = params.id;
    try {
        const updatePost = await prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                prompt,
                tag,
            },
        });
        return NextResponse.json({messagge: 'updated successfully'});
    } catch (error) {
        return NextResponse.json(
            {mesagge: 'Failed to update post', error: error},
            {status: 409}
        );
    }
}
