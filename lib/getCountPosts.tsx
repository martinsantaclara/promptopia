'use server';
import prisma from '@/lib/prisma';

const getCountPosts = async () => {
    const total = await prisma.post.count();
    return total;
};

export default getCountPosts;
