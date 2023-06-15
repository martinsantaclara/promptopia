import {NextResponse} from 'next/server';
import prisma from 'lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany({where: {id: 2}});
        return NextResponse.json(users, {status: 200});
    } catch (error) {
        return NextResponse.json('Failed to fetch all users', {
            status: 500,
        });
    }
}

// export async function POST(req) {
//     const {userId, prompt, tag} = await req.json();
//     const date3 = new Date();
//     const localDate = new Date(
//         date3.getTime() - date3.getTimezoneOffset() * 60 * 1000
//     );
//     try {
//         const newPrompt = await prisma.prompt.create({
//             data: {
//                 creator: userId,
//                 prompt,
//                 tag,
//                 createdAt: localDate,
//             },
//         });

//         // NextResponse.revalidate('/prompt');

//         return NextResponse.json(newPrompt, {status: 201});
//     } catch (error) {
//         return NextResponse.json('Failed to create a new prompt', {
//             status: 500,
//         });
//     }
// }
