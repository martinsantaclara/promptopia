import {Metadata} from 'next';
import getAllUsers from '@/lib/getAllUsers';
import Link from 'next/link';
import {user} from '@prisma/client';

export const metadata: Metadata = {
    title: 'Users',
};

export const revalidate = 10;

const UsersPage = async () => {
    const usersData: Promise<user[]> = getAllUsers();
    const users = await usersData;

    console.log(users);

    return (
        <div>
            <Link href="/">Back to Home</Link>
            {users.map((user) => (
                <div key={user.id}>
                    <Link href={`/users/${user.id}`}>{user.username}</Link>{' '}
                </div>
            ))}
        </div>
    );
};

export default UsersPage;
