import {Metadata} from 'next';
import getAllUsers from '@/lib/getAllUsers';
import Link from 'next/link';
import {user} from '@prisma/client';

export const metadata: Metadata = {
    title: 'Users',
};

export const revalidate = 10;

const getUsers = async () => {
    const res = await fetch(`${process.env.URL_BASE}/api/users`, {
        next: {revalidate: 10},
    });

    return res.json();
};

const UsersPage = async () => {
    // const usersData: Promise<user[]> = getAllUsers();
    // const users = await usersData;

    const users: user[] = await getUsers();
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
