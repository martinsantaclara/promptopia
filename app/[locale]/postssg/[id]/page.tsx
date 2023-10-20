import type {Metadata} from 'next';
import getPost from '@/lib/getPost';
import getAllUsers from '@/lib/getAllUsers';
import {user} from '@prisma/client';
import getUserPosts from '@/lib/getUserPosts';

export const metadata: Metadata = {
    title: 'Post SSG',
    description: 'a post will be updated',
};

type Params = {
    params: {
        id: string;
    };
};

const PostPage = async ({params: {id}}: Params) => {
    const postId = id;
    const posts = await getUserPosts(postId);

    return (
        <>
            {posts.map((post) => {
                return (
                    <div>
                        <p>{post?.id}</p>
                        <p>{post?.prompt}</p>
                        <p>{post?.tag}</p>
                        <p>{post?.creator}</p>
                    </div>
                );
            })}
        </>
    );
};

export default PostPage;

export async function generateStaticParams() {
    const users: user[] = await getAllUsers();
    return users.map((user) => {
        id: user.id;
    });
}
