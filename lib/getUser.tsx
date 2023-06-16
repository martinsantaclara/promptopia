import prisma from './prisma';
const getUser = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) return undefined;
    return user;
};

export default getUser;
