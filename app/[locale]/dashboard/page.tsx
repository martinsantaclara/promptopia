import {getServerSession} from 'next-auth/next';
import {options} from '@/app/api/auth/[...nextauth]/options';
import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard page',
};

const baseUrl = process.env.BASE_URL;

export default async function DashboardPage() {
    console.log('baseUrl', baseUrl);
    const session = await getServerSession(options);
    return (
        <div>
            <h1 className="text-indigo-800 text-4xl">Dashboard Page</h1>;
            <Link
                href="http://localhost:3000/api/auth/callback/email?callbackUrl=http://localhost:3000/es&token=da6855647a36d8a539c56f77ec910aba679bfc263d794a428b86ed1404a658dd&email=martinsantaclara%40yahoo.com.ar
"
            >
                ir a home english
            </Link>
        </div>
    );
}
