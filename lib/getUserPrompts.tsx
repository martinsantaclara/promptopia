import prisma from './prisma';

const getUserPrompts = async (userId: number) => {
    const userPrompts = await prisma.prompt.findMany({
        where: {
            creator: userId,
        },
    });
    if (!userPrompts) return undefined;
    return userPrompts;
};

export default getUserPrompts;
