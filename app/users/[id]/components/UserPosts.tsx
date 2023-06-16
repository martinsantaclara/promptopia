import {prompt} from '@prisma/client';

type Props = {
    promise: Promise<prompt[] | undefined>;
};

const UserPosts = async ({promise}: Props) => {
    const prompts = await promise;
    const content = prompts?.map((prompt) => {
        return (
            <>
                <article key={prompt.id}>
                    <h2>{prompt.prompt}</h2>
                    <h2>{prompt.tag}</h2>
                    <br />
                </article>
            </>
        );
    });
    return content;
};

export default UserPosts;
