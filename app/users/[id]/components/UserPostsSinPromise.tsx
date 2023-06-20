import getUserPrompts from '@/lib/getUserPrompts';
import {prompt} from '@prisma/client';

type Props = {
    id: string;
};

const UserPostsSinPromise = async ({id}: Props) => {
    const userPromptsData: Promise<prompt[] | undefined> = getUserPrompts(
        parseInt(id)
    );
    const prompts = await userPromptsData;
    return (
        <>
            {prompts?.map((prompt) => {
                return (
                    <article key={prompt.id}>
                        <h2>{prompt.creator}</h2>
                        <h2>{prompt.prompt}</h2>
                        <h2>{prompt.tag}</h2>
                        <br />
                    </article>
                );
            })}
        </>
    );
};

export default UserPostsSinPromise;
