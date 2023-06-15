import getUser from '@/lib/getUser';
import getUserPrompts from '@/lib/getUserPrompts';
import {user, prompt} from '@prisma/client';
import {Suspense} from 'react';
import UserPosts from './components/UserPosts';
import {Metadata} from 'next';

type Params = {
    params: {id: string};
};

export const generateMetadata = async ({
    params: {id},
}: Params): Promise<Metadata> => {
    const userData: Promise<user | null> = getUser(parseInt(id));
    const user: user | null = await userData;

    return {
        title: user?.username,
        description: `This is the page of ${user?.username}`,
    };
};

const UserPage = async ({params: {id}}: Params) => {
    const userData: Promise<user | null> = getUser(parseInt(id));
    const userPromptsData: Promise<prompt[]> = getUserPrompts(parseInt(id));
    // const [user, userPrompts] = await Promise.all([userData, userPromptsData]);

    //  {/* @ts-expect-error Server Component */}

    const user = await userData;

    return (
        <>
            <h2>{user?.email}</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPromptsData} />
            </Suspense>
        </>
    );
};

export default UserPage;
