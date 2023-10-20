import prisma from '@/lib/prisma';

const getPost = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });
    return post;
};

export default getPost;
