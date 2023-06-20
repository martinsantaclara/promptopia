import getComments from '@/lib/getComments';
import {prompt} from '@prisma/client';

type Props = {
    promise: Promise<Commentario[]>;
};

const CommentsPage = async () => {
    const comments: Commentario[] = await getComments();
    const content = comments?.map((comment) => {
        return (
            <>
                <article key={comment.id}>
                    <h2>{comment.id}</h2>
                    <h2>{comment.name}</h2>
                    <h2>{comment.email}</h2>
                    <h2>{comment.body}</h2>
                    <br />
                </article>
            </>
        );
    });
    return content;
};

export default CommentsPage;
