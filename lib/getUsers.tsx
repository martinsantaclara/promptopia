import prisma from './prisma';

const getUsers = async () => {
    // const response = await prisma.user.findMany();
    // // const users = await response
    // return response;
    // const res = await fetch('http://localhost:3000/api/user', {
    //     next: {revalidate: 10},
    // });
    // const res = await fetch('http://localhost:3000/api/prompt');
    const res = await fetch(`${process.env.URL_BASE}/api/user`, {
        cache: 'no-store',
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

export default getUsers;
