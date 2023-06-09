import getUser from '@/lib/getUser';
import getUserPrompts from '@/lib/getUserPrompts';
import {user, prompt} from '@prisma/client';
import {Suspense} from 'react';
import UserPosts from './components/UserPosts';
import {Metadata} from 'next';
import getAllUsers from '@/lib/getAllUsers';

import {notFound} from 'next/navigation';
import UserPostsSinPromise from './components/UserPostsSinPromise';
import getComments from '@/lib/getComments';
import CommentsPage from './components/CommentsCpte';

type Params = {
    params: {id: string};
};

export const generateMetadata = async ({
    params: {id},
}: Params): Promise<Metadata> => {
    const userData: Promise<user | undefined> = getUser(parseInt(id));
    const user: user | undefined = await userData;

    if (!user) {
        return {
            title: 'User Not Found',
        };
    }

    return {
        title: user?.username,
        description: `This is the page of ${user?.username}`,
    };
};

const UserPage = async ({params: {id}}: Params) => {
    const userData: Promise<user | undefined> = getUser(parseInt(id));
    // const userPromptsData: Promise<prompt[] | undefined> = getUserPrompts(
    //     parseInt(id)
    // );
    // const [user, userPrompts] = await Promise.all([userData, userPromptsData]);
    // {/* @ts-expect-error Server Component */}

    // const commentData: Promise<Commentario[]> = getComments();

    const user = await userData;

    if (!user) return notFound();

    return (
        <>
            <h2>{user?.email}</h2>
            <br />
            <Suspense fallback={<h2>🌀 Loading...</h2>}>
                {/* <UserPosts promise={userPromptsData} /> */}
                {/* <CommentsPage /> */}

                <UserPostsSinPromise id={id} />
            </Suspense>
        </>
    );
};

export default UserPage;

export const generateStaticParams = async () => {
    const usersData: Promise<user[]> = getAllUsers();
    const users = await usersData;

    return users.map((user) => ({
        id: user.id.toString(),
    }));
};
