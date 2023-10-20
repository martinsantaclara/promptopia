import prisma from '@/lib/prisma';
export default async function getUserPosts(creatorId: string) {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
        where: {
            creator: creatorId as string,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return posts;
}
