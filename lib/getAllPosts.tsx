'use server';
import prisma from '@/lib/prisma';

const getAllPosts = async (limit = 0) => {
    //const total = await prisma.post.count()
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip: limit * 4,
        take: 4,
    });
    type prismaUsers = typeof posts;
    return posts;
};

export default getAllPosts;
