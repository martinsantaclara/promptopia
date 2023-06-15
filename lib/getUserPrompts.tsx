import prisma from './prisma';

const getUserPrompts = async (userId: number) => {
    const userPrompts = await prisma.prompt.findMany({
        where: {
            creator: userId,
        },
    });
    if (!userPrompts) throw new Error(`Dont Fetched Prompts`);
    return userPrompts;
};

export default getUserPrompts;
