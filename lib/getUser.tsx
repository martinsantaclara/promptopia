import prisma from '@/lib/prisma';

const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
};

export default getUser;
