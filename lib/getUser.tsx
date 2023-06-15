import prisma from './prisma';
const getUser = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) throw new Error(`User ${id} not found`);
    return user;
};

export default getUser;
